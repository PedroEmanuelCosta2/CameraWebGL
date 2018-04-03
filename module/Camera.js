class Camera {

	constructor(){
		this.mvMatrix = new Matrix(4);
		this.pMatrix = new Matrix(4);

		this.up = vec3.fromValues(0,1,0);
		this.position = vec3.create();
        this.cameraTarget = vec3.create();
	}

    perspective(radianAngle, viewPortRatio, nearBound, farBound){
		this.pMatrix.perspective(radianAngle, viewPortRatio, nearBound, farBound);
    }

    ortho(left, right, bottom, top, near, far){
        this.pMatrix.ortho(left, right, bottom, top, near, far);
    }

    setFrustum(left, right, bottom, top, near, far){
        this.pMatrix.frustum(left, right, bottom, top, near, far);
    }

	multMvMatrix(mvMatrix){
	    let tmpMatrix = mat4.create();
	    mat4.identity(tmpMatrix);
	    mat4.multiply(tmpMatrix, this.mvMatrix.matrix, mvMatrix);
	    return tmpMatrix;
    }

    multPMatrix(pMatrix){
        let tmpMatrix = mat4.create();
        mat4.identity(tmpMatrix);
        mat4.multiply(tmpMatrix, this.pMatrix.matrix, pMatrix);
        return tmpMatrix;
    }

	setPositionOfCamera(x,y,z){
	    if (typeof x === "object"){
            this.position[0] = x[0] || 0;
            this.position[1] = x[1] || 0;
            this.position[2] = x[2] || 0;
        }else{
	        this.position[0] = x || 0;
            this.position[1] = y || 0;
            this.position[2] = z || 0;
        }
    }

    setTargetOfCamera(x,y,z){
	    if(typeof x === "object"){
	        this.cameraTarget[0] = x[0] || 0;
            this.cameraTarget[1] = x[1] || 0;
            this.cameraTarget[2] = x[2] || 0;
        }else{
            this.cameraTarget[0] = x || 0;
            this.cameraTarget[1] = y || 0;
            this.cameraTarget[2] = z || 0;
        }
    }

    setTargetOfCameraSmooth(x,y,z,dt){
	    let dx = 0;

	    if (typeof x === "object"){
	        dx = vec3.distance(x, this.cameraTarget) / dt;
	    }else{
            dx = vec3.distance(vec3.fromValues(x,y,z), this.cameraTarget) / dt;
	    }

	    let self = this;

        let targetAnim = setInterval(function(){

            if (x > self.cameraTarget[0]) {
                self.cameraTarget[0] += dx;
            }if(x < self.cameraTarget[0]){
                self.cameraTarget[0] -= dx;
            }if(y > self.cameraTarget[1]){
                self.cameraTarget[1] += dx;
            }if(y < self.cameraTarget[1]){
                self.cameraTarget[1] -= dx;
            }if(z > self.cameraTarget[2]){
                self.cameraTarget[2] += dx;
            }if(z < self.cameraTarget[2]){
                self.cameraTarget[2] -= dx;
            }

            self.setTargetOfCamera(self.cameraTarget);

            if (vec3.distance(vec3.fromValues(x,y,z), self.cameraTarget) < 0.5){
                clearInterval(targetAnim);
            }

        }, 16);
    }

    setPositionOfCameraSmooth(x,y,z,dt){
        let dx = 0;
        let vecDestination;

        if (typeof x === "object"){
            dx = vec3.distance(x, this.position) / dt;
            console.log(dt);
            vecDestination = x;
            y = x[1];
            z = x[2];
            x = x[0];
        }else{
            dx = vec3.distance(vec3.fromValues(x,y,z), this.position) / dt;
            vecDestination = vec3.fromValues(x,y,z);
        }

        let self = this;

        let positionAnim = setInterval(function(){

            if (x > self.position[0]) {
                self.position[0] += dx;
            }if(x < self.position[0]){
                self.position[0] -= dx;
            }if(y > self.position[1]){
                self.position[1] += dx;
            }if(y < self.position[1]){
                self.position[1] -= dx;
            }if(z > self.position[2]){
                self.position[2] += dx;
            }if(z < self.position[2]){
                self.position[2] -= dx;
            }

            self.setPositionOfCamera(self.position);

            if (vec3.distance(vecDestination, self.position) < 0.1){
                clearInterval(positionAnim);
            }

        }, 16);
    }

    rotationAroundSmooth(point, radius, angle, dt){
        function x (teta){
            return point[0] + radius * Math.cos(teta);
        }

        function z (teta){
            return point[1] + radius * Math.sin(teta);
        }

        function y (teta){
            return 3 * Math.sin(teta);
        }

        this.applyGeometricalFunctionsSmooth(x, y, z, angle, dt);
    }

    applyGeometricalFunctionsSmooth(x,y,z,value,dt){
	    let dx = value / dt;
	    let tmp = 0;

	    let self = this;

	    let geometricalAnim = setInterval(function () {
            tmp += dx;
            if (typeof x === 'function')
                self.position[0] = x(tmp);
            if (typeof y === 'function')
                self.position[1] = y(tmp);
            if (typeof z === 'function')
                self.position[2] = z(tmp);

            if (tmp >= value){
                clearInterval(geometricalAnim);
            }
        }, 16);
    }

    update(){
        this.mvMatrix.lookAt(this.position, this.cameraTarget, this.up);
    }
}
