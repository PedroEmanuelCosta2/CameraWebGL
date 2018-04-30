class Camera {

    /**
     * Constructor of the camera.
     * The camera got it's own mvMatrix and pMatrix so it's independent from the objects of the scene.
     *
     * The camera need three vectors, we use them to focus the camera on one point and to move it.
     */
    constructor() {
        this.mvMatrix = new Matrix(4);
        this.pMatrix = new Matrix(4);

        this.up = vec3.fromValues(0, 1, 0);
        this.position = vec3.create();
        this.cameraTarget = vec3.create();
    }

    /**
     * Set the perspective projection for the camera.
     *
     * @param {number} radianAngle the aperture of the field of view
     * @param {number} viewPortRatio ratio of the window
     * @param {number} nearBound position of the top rectangle of the frustum
     * @param {number} farBound position of the bottom rectangle of the frustum
     */
    perspective(radianAngle, viewPortRatio, nearBound, farBound) {
        this.pMatrix.perspective(radianAngle, viewPortRatio, nearBound, farBound);
    }

    /**
     * Set the orthogonal projection for the camera.
     *
     * @param {number} left position for the left side of the frustum
     * @param {number} right position for the right side of the frustum
     * @param {number} bottom position for the bottom side of the frustum
     * @param {number} top position for the top side of the frustum
     * @param {number} near position for the near side of the frustum
     * @param {number} far position for the far side of the frustum
     */
    orthogonal(left, right, bottom, top, near, far) {
        this.pMatrix.ortho(left, right, bottom, top, near, far);
    }

    /**
     * Set the parameters of the frustum.
     *
     * @param {number} left position for the left side of the frustum
     * @param {number} right position for the right side of the frustum
     * @param {number} bottom position for the bottom side of the frustum
     * @param {number} top position for the top side of the frustum
     * @param {number} near position for the near side of the frustum
     * @param {number} far position for the far side of the frustum
     */
    setFrustum(left, right, bottom, top, near, far) {
        this.pMatrix.frustum(left, right, bottom, top, near, far);
    }

    /***
     * Multiply the receiving matrix with the mvMatrix of the camera.
     * This function is necessary to call in the draw function of your application.
     * The mvMatrix in the parameter is the mvMatrix of the objects in the scene.
     *
     * The matrix that is return is the matrix that will be given to the fragments shader.
     *
     * @param {mat4} mvMatrix the receiving matrix
     * @return {mat4} tmpMatrix the return matrix
     */
    multMvMatrix(mvMatrix) {
        let tmpMatrix = new Matrix(4);
        tmpMatrix.multiply(this.mvMatrix, mvMatrix);
        return tmpMatrix.matrix;
    }

    /**
     * Multiply the receiving matrix with the pMatrix of the camera.
     * This function is necessary to call in the draw function of your application.
     * The pMatrix in the parameter is the pMatrix of the objects in the scene.
     *
     * The matrix that is return is the matrix that will be given to the fragments shader.
     *
     * @param {mat4} pMatrix the receiving matrix
     * @return {mat4} tmpMatrix the return matrix
     */
    multPMatrix(pMatrix) {
        let tmpMatrix = new Matrix(4);
        tmpMatrix.multiply(this.pMatrix, pMatrix);
        return tmpMatrix.matrix;
    }

    /**
     * Set the position of the camera.
     *
     * @param {number} x position of the camera in the scene
     * @param {number} y position of the camera in the scene
     * @param {number} z position of the camera in the scene
     */
    setPositionOfCamera(x, y, z) {
        if (typeof x === "object") {
            this.position[0] = x[0] || 0;
            this.position[1] = x[1] || 0;
            this.position[2] = x[2] || 0;
        } else {
            this.position[0] = x || 0;
            this.position[1] = y || 0;
            this.position[2] = z || 0;
        }
    }

    /**
     * Set the target's positions the camera will point.
     *
     * @param {number} x position of the target in the scene
     * @param {number} y position of the target in the scene
     * @param {number} z position of the target in the scene
     */
    setTargetOfCamera(x, y, z) {
        if (typeof x === "object") {
            this.cameraTarget[0] = x[0] || 0;
            this.cameraTarget[1] = x[1] || 0;
            this.cameraTarget[2] = x[2] || 0;
        } else {
            this.cameraTarget[0] = x || 0;
            this.cameraTarget[1] = y || 0;
            this.cameraTarget[2] = z || 0;
        }
    }

    /**
     * Set the target's positions the camera will point with an animate movement.
     *
     * @param {number} x position of the target in the scene
     * @param {number} y position of the target in the scene
     * @param {number} z position of the target in the scene
     * @param {number} dt factor of division that will divide the distance between the point of the actual target
     *                 and the future target. The smaller the factor is the faster it will go.
     */
    easeTargetOfCamera(x, y, z, dt) {
        let dx = 0;

        if (typeof x === "object") {
            dx = vec3.distance(x, this.cameraTarget) / dt;
        } else {
            dx = vec3.distance(vec3.fromValues(x, y, z), this.cameraTarget) / dt;
        }

        let self = this;

        let targetAnim = setInterval(function () {

            let tmpVec = self.cameraTarget;

            if (x > self.cameraTarget[0]) {
                tmpVec[0] += dx;
            }
            if (x < self.cameraTarget[0]) {
                tmpVec[0] -= dx;
            }
            if (y > self.cameraTarget[1]) {
                tmpVec[1] += dx;
            }
            if (y < self.cameraTarget[1]) {
                tmpVec[1] -= dx;
            }
            if (z > self.cameraTarget[2]) {
                tmpVec[2] += dx;
            }
            if (z < self.cameraTarget[2]) {
                tmpVec[2] -= dx;
            }

            self.setTargetOfCamera(tmpVec);

            if (vec3.distance(vec3.fromValues(x, y, z), self.cameraTarget) < 0.3) {
                clearInterval(targetAnim);
            }

        }, 16);
    }

    /**
     * Set the position of the camera with an animation.
     *
     * @param {number} x position of the camera in the scene
     * @param {number} y position of the camera in the scene
     * @param {number} z position of the camera in the scene
     * @param {number} dt factor of division that will divide the distance between the point of the actual target
     *                 and the future target. The smaller the factor is the faster it will go.
     */
    easePositionOfCamera(x, y, z, dt) {
        let dx = 0;
        let vecDestination;

        if (typeof x === "object") {
            dx = vec3.distance(x, this.position) / dt;
            console.log(dt);
            vecDestination = x;
            y = x[1];
            z = x[2];
            x = x[0];
        } else {
            dx = vec3.distance(vec3.fromValues(x, y, z), this.position) / dt;
            vecDestination = vec3.fromValues(x, y, z);
        }

        let self = this;

        let positionAnim = setInterval(function () {

            let tmpVec = self.position;

            if (x > self.position[0]) {
                tmpVec[0] += dx;
            }
            if (x < self.position[0]) {
                tmpVec[0] -= dx;
            }
            if (y > self.position[1]) {
                tmpVec[1] += dx;
            }
            if (y < self.position[1]) {
                tmpVec[1] -= dx;
            }
            if (z > self.position[2]) {
                tmpVec[2] += dx;
            }
            if (z < self.position[2]) {
                tmpVec[2] -= dx;
            }

            self.setPositionOfCamera(tmpVec);

            if (vec3.distance(vecDestination, self.position) < 0.2) {
                clearInterval(positionAnim);
            }

        }, 16);
    }

    /**
     * Function that will set the positions of the camera with geometrical functions with an animation.
     *
     * @param {number} x position of the camera in the scene
     * @param {number} y position of the camera in the scene
     * @param {number} z position of the camera in the scene
     * @param {number} value that will end the animation
     * @param {number} dt factor of division that will divide the distance between the point of the actual target
     *                 and the future target. The smaller the factor is the faster it will go.
     */
    easeGeometricalFunction(x, y, z, value, dt) {
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

            if (tmp >= value) {
                clearInterval(geometricalAnim);
            }
        }, 16);
    }

    /**
     * Example of the utility of the applyGeometricalFunctionSmooth function.
     *
     * @param {number} point to the center it will rotate around
     * @param {number} radius of the circle
     * @param {number} angle angle the camera will rotate (360° for one rotation)
     * @param {number} dt factor of division that will divide the distance between the point of the actual target
     *                 and the future target. The smaller the factor is the faster it will go.
     */
    easeRotation(point, radius, angle, dt) {
        function x(teta) {
            return point[0] + radius * Math.cos(teta);
        }

        function z(teta) {
            return point[1] + radius * Math.sin(teta);
        }

        function y(teta) {
            return 3 * Math.sin(teta);
        }

        this.easeGeometricalFunction(x, y, z, angle, dt);
    }

    /**
     * Update the mvMatrix with the position, cameraTarget and up vectors so the camera will take in count all the
     * modifications. The camera will be at the position of the position's vector in the scene and focus at the
     * cameraTarget's vector.
     */
    update() {
        this.mvMatrix.lookAt(this.position, this.cameraTarget, this.up);
    }
}

class Matrix {

    /**
     * Constructor of the Matrix class.
     *
     * @param {number} size of the matrix.
     */
    constructor(size) {
        switch (size) {
            case 2:
                this.module = mat2;
                break;
            case 3:
                this.module = mat3;
                break;
            case 4:
                this.module = mat4;
                break;
            default:
                console.log("Declare a correct matrix's size.");
                break;
        }
        this.matrix = this.module.create();
        this.identity();
    }

    /**
     * Identity of the matrix.
     */
    identity() {
        this.module.identity(this.matrix);
    }

    /**
     * Translate the matrix with the receiving vector. And set the result to the Matrix that call this function.
     *
     * @param {Matrix} matrixToTranslate
     * @param {vec3} vectorToTranslateBy
     */
    translate(matrixToTranslate, vectorToTranslateBy) {
        this.module.translate(this.matrix, matrixToTranslate.matrix, vectorToTranslateBy);
    }

    /**
     * Multiply the firstMatrix with the secondMatrix. And set the result to the Matrix that call this function.
     *
     * @param {Matrix} firstMatrix
     * @param {Matrix} secondMatrix
     */
    multiply(firstMatrix, secondMatrix) {
        if (firstMatrix instanceof  Matrix && secondMatrix instanceof Matrix) {
            this.module.multiply(this.matrix, firstMatrix.matrix, secondMatrix.matrix);
        } else if (secondMatrix instanceof Matrix){
            this.module.multiply(this.matrix, firstMatrix, secondMatrix.matrix);
        } else if (firstMatrix instanceof Matrix){
            this.module.multiply(this.matrix, firstMatrix.matrix, secondMatrix);
        } else {
            this.module.multiply(this.matrix, firstMatrix, secondMatrix);
        }
    }

    /**
     * Rotate the matrix on the Y axe with the matrixToRotate and the angleToRotate.
     * And set the result to the Matrix that call this function.
     *
     * @param {Matrix} matrixToRotate
     * @param {number} angleToRotate
     */
    rotateY(matrixToRotate, angleToRotate) {
        return this.module.rotateY(this.matrix, matrixToRotate.matrix, angleToRotate);
    }

    /**
     * Set a perspective matrix for the pMatrix.
     *
     * @param {number} radianAngle the aperture of the field of view
     * @param {number} viewPortRatio ratio of the window
     * @param {number} nearBound position of the top rectangle of the frustum
     * @param {number} farBound position of the bottom rectangle of the frustum
     */
    perspective(radianAngle, viewPortRatio, nearBound, farBound) {
        this.module.perspective(this.matrix, radianAngle, viewPortRatio, nearBound, farBound);
    }

    /**
     * Set the lookAt matrix to move the camera and change the point it will target.
     *
     * @param {vec3} eye position of the camera
     * @param {vec3} center position to target with the camera
     * @param {vec3} up vector
     */
    lookAt(eye, center, up) {
        this.module.lookAt(this.matrix, eye, center, up);
    }

    /**
     * Set the parameters of the frustum.
     *
     * @param {number} left position for the left side of the frustum
     * @param {number} right position for the right side of the frustum
     * @param {number} bottom position for the bottom side of the frustum
     * @param {number} top position for the top side of the frustum
     * @param {number} near position for the near side of the frustum
     * @param {number} far position for the far side of the frustum
     */
    frustum(left, right, bottom, top, near, far) {
        this.module.frustum(this.matrix, left, right, bottom, top, near, far);
    }

    /**
     * Set the orthogonal projection for the camera.
     *
     * @param {number} left position for the left side of the frustum
     * @param {number} right position for the right side of the frustum
     * @param {number} bottom position for the bottom side of the frustum
     * @param {number} top position for the top side of the frustum
     * @param {number} near position for the near side of the frustum
     * @param {number} far position for the far side of the frustum
     */
    ortho(left, right, bottom, top, near, far) {
        this.module.ortho(this.matrix, left, right, bottom, top, near, far);
    }

    /**
     * Invesrse the matrix that call this function.
     *
     * @param {Matrix} matrixToInvert
     */
    inverse(matrixToInvert) {
        this.module.invert(this.matrix, matrixToInvert.matrix);
    }
}

// TESTS
try{
    console.log(mat4);
    console.log("glMatrix is available");
}catch {
    alert("glMatrix isn't available !");
}

try{
    console.log(Matrix);
    console.log("The class Matrix is available.");
}catch{
    alert("Matrix isn't available");
}

if (typeof glContext === 'undefined'){
    alert("The webglTools aren't available.");
}else{
    console.log("The webglTools are available.");
}