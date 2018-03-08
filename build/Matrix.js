class Matrice {

	constructor(taille){

		switch(taille){
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
				console.log("Déclarez une taille correcte de matrice.")
				break;
		}
		this.matrix = this.module.create();
		this.identity();
	}

	identity(){
		this.module.identity(this.matrix);
	}

	translate(matrixToTranslate, vectorToTranslateBy){
		this.module.translate(this.matrix,matrixToTranslate.matrix,vectorToTranslateBy);
	}

	multiply(firstMatrix,secondMatrix){
		this.module.multiply(this.matrix,firstMatrix.matrix,secondMatrix.matrix);
	}

	rotateY(matrixToRotate, angleToRotate){
		return this.module.rotateY(this.matrix, matrixToRotate.matrix, angleToRotate);
	}
}