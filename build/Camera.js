class Camera {

	constructor(){
		this.mvMatrix = new Matrix(4);
		this.pMatrix = new Matrix(4);

		this.up = vec3.fromValues(0,1,0);
		this.position = vec3.create();
        this.cameraTarget = vec3.fromValues(0,0,0);
	}

	uniform(){
	    this.uniformPMatrix();
        this.uniformMvMatrix();
        this.update();
	}

    uniformPMatrix(){
        glContext.uniformMatrix4fv(prg.pMatrixUniform, false, this.pMatrix.matrix);
    }

    uniformMvMatrix(){
        glContext.uniformMatrix4fv(prg.mvMatrixUniform, false, this.mvMatrix.matrix);
    }

    perspective(radianAngle, viewPortRatio, nearBound, farBound){
		this.pMatrix.perspective(radianAngle, viewPortRatio, nearBound, farBound);
    }

	rotate(vectorToTranslateBy){
		let translationMat = new Matrix(4);
		translationMat.translate(translationMat, vectorToTranslateBy);
		this.mvMatrix.multiply(translationMat, this.mvMatrix);
	}

	rotateY(matrixToRotate, angleToRotate){
		this.mvMatrix.matrix = this.mvMatrix.rotateY(matrixToRotate, angleToRotate);
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

        if (typeof x === "object"){
            dx = vec3.distance(x, this.position) / dt;
        }else{
            dx = vec3.distance(vec3.fromValues(x,y,z), this.position) / dt;
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

            if (vec3.distance(vec3.fromValues(x,y,z), self.position) < 0.5){
                clearInterval(positionAnim);
            }

        }, 16);
    }

    update(){
        this.mvMatrix.lookAt(this.position, this.cameraTarget, this.up);
    }

    setFrustum(left, right, bottom, top, near, far){
	    this.pMatrix.frustum(left, right, bottom, top, near, far);
    }

    setOrtho(left, right, bottom, top, near, far){
	    this.pMatrix.ortho(left, right, bottom, top, near, far);
    }
}