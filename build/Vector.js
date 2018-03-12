class Vector{

    constructor(size){

        switch(size){
            case 2:
                this.module = vec2;
                break;
            case 3:
                this.module = vec3;
                break;
            case 4:
                this.module = vec4;
                break;
            default:
                console.log("Declare a correct vector's size.")
                break;
        }

        this.vector = this.module.create();
    }
}