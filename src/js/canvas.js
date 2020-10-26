const { rand } = require('./utils')
const vector = require('./vector');

const canvas = document.querySelector('canvas'),
    ctx = canvas.getContext('2d');


let particle_count , 
    particles;

const colors = ['red' , 'green' , 'blue' , 'gold' , 'yellow' ];
const config = {
    GRAVITY: 0.9, 
    FRICTION: 0.8, 
    AIR_RESITANCE: 0.01, 
    width: 500,
    height: 500, 
}



class Particle {
    constructor(pos , vel , acc , radius,  color) {
        this.pos = pos;
        this.vel = vel;
        this.acc = acc;
        this.radius = radius;
        this.color = color;
    }
    draw() {
        //draw circle
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.pos.x , this.pos.y , this.radius , 0 , Math.PI * 2 , false);
        ctx.fill();
        ctx.closePath();
        // end ><
    }

    update() {
        //this.vel = vector.add(this.vel , this.acc);
        this.pos = vector.add(this.pos , this.vel);

        if(this.pos.y > canvas.height - this.radius) {
            this.pos.y = canvas.height - this.radius;
            this.vel.y = -this.vel.y;
        } else if(this.pos.y < this.radius) {
            this.pos.y = this.radius;
            this.vel.y = -this.vel.y;
        }


        if(this.pos.x > canvas.width - this.radius) {
            this.pos.x = canvas.width - this.radius;
            this.vel.x = -this.vel.x;
        } else if(this.pos.x < this.radius) {
            this.pos.x = this.radius;
            this.vel.x = -this.vel.x;
        }

        this.draw();
    }
     collision(another) {

         if(vector.dist(this.pos , another.pos) <= (this.radius + another.radius))
         {

             const normal_vector = vector.sub(this.pos, another.pos);
             const unit_normal = vector.div(normal_vector, normal_vector.mag());
             const unit_tangent = unit_normal.getTan();

             const correction = vector.mult(unit_normal, this.radius + another.radius);
             const new_vector = vector.add(another.pos, correction);

             this.pos = new_vector;

             const initial_vel_a = this.vel;
             const initial_vel_b = another.vel;


             const after_n_a = unit_normal.dot(initial_vel_a);
             const after_t_a = unit_tangent.dot(initial_vel_a);

             const after_n_b = unit_normal.dot(initial_vel_b);
             const after_t_b = unit_tangent.dot(initial_vel_b);

             const new_normal_a =
                 (after_n_a * (this.radius - another.radius) + 2 * another.radius * after_n_b) /
                 (this.radius + another.radius);
             const new_normal_b =
                 (after_n_b * (another.radius - this.radius) + 2 * this.radius * after_n_a) /
                 (this.radius + another.radius);

             const new_tan_a = after_t_a;
             const new_tan_b = after_t_b;

             const new_normal_vec_a = vector.mult(unit_normal, new_normal_a);
             const new_normal_vec_b = vector.mult(unit_normal, new_normal_b);

             const new_tan_vec_a = vector.mult(unit_tangent, new_tan_a);
             const new_tan_vec_b = vector.mult(unit_tangent, new_tan_b);

             const a_final = vector.add(new_normal_vec_a, new_tan_vec_a);
             const b_final = vector.add(new_normal_vec_b, new_tan_vec_b);

             this.vel = a_final;
             another.vel = b_final;


         }
    }

}

const init = () => {

    particle_count = 20;
    particles = [];

    canvas.width = config.width;
    canvas.height = config.height;

    for(let i = 0; i < particle_count; ++i) {
        particles.push(new Particle(
            new vector(vector.rand(0, canvas.width), canvas.height),
            new vector(vector.rand(-1, 5), vector.rand(-10, -5)),
            new vector(0 , config.GRAVITY),
            rand(5, 10),
            colors[rand(0 , colors.length - 1)]
        ))

    }
}

init();
const loop = () => {
    ctx.rect(0,0, canvas.width , canvas.height);
    ctx.fillStyle = "rgba(0,0,0,0.9)";
    ctx.fill();

    for(let particle of particles) {
        particle.update();
        for(let another of particles) {
            if(particle !== another) {
                particle.collision(another)
            }
                
        }
    }
    requestAnimationFrame(loop);

}
loop();
