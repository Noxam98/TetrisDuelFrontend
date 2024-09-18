import {next} from "lodash/seq.js";
import {arraySlice} from "three/src/animation/AnimationUtils.js";
import _ from 'lodash'
class Tetramino {
    currentTetramino = this._randomChoiceTetramino()
    nextTetraminos = []

    constructor() {
        this._initTetraminos()

    }



    getNextTetraminos(){
        return this.nextTetraminos
    }

    setCurrentTetramino(tetramino){
        this.currentTetramino = tetramino
    }

    _initTetraminos() {
        // this.currentTetramino = this._randomChoiceTetramino()
        this.nextTetraminos.push(this._randomChoiceTetramino())
        this.nextTetraminos.push(this._randomChoiceTetramino())
    }

    _randomChoiceTetramino() {
        return tetraminoInitValues['IOTJLSZ'[Math.floor(Math.random() * 7)]]
    }

    tetraminoRenew() {
        // this.currentTetramino = this.nextTetraminos.splice(0, 1)
        // console.log()
        const newCurrentTetra = this.nextTetraminos.splice(0, 1)[0]
        this.currentTetramino = newCurrentTetra
        this.nextTetraminos.push(this._randomChoiceTetramino())

        // console.log(this.nextTetraminos)
    }



    turnRight(set = false) {
        const oa = this.currentTetramino
        let newArr = []
        if (oa.length === 4)
            newArr = [
                [oa[3][0], oa[2][0], oa[1][0], oa[0][0]],
                [oa[3][1], oa[2][1], oa[1][1], oa[0][1]],
                [oa[3][2], oa[2][2], oa[1][2], oa[0][2]],
                [oa[3][3], oa[2][3], oa[1][3], oa[0][3]],
            ]
        else if (oa.length === 3)
            newArr = [
                [oa[2][0], oa[1][0], oa[0][0]],
                [oa[2][1], oa[1][1], oa[0][1]],
                [oa[2][2], oa[1][2], oa[0][2]],
            ]
        else
            newArr = oa
        if (set)
            this.currentTetramino = newArr
        // console.log(this.currentTetramino)
        return newArr
    }

    turnLeft(set = false) {
        const oa = this.currentTetramino
        let newArr = []
        if (oa.length === 4)
            newArr = [
                [oa[0][3], oa[1][3], oa[2][3], oa[3][3]],
                [oa[0][2], oa[1][2], oa[2][2], oa[3][2]],
                [oa[0][1], oa[1][1], oa[2][1], oa[3][1]],
                [oa[0][0], oa[1][0], oa[2][0], oa[3][0]],
            ]
        else if (oa.length === 3)
            newArr = [
                [oa[0][2], oa[1][2], oa[2][2]],
                [oa[0][1], oa[1][1], oa[2][1]],
                [oa[0][0], oa[1][0], oa[2][0]],
            ]
        else
            newArr = oa
        if (set)
            this.currentTetramino = newArr
        // console.log(this.currentTetramino)
        return newArr
    }

}

const tetraminoInitValues = {
    I: [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
    ],
    O: [

        [1, 1],
        [1, 1],

    ],
    T: [
        [1, 1, 1],
        [0, 1, 0],
        [0, 0, 0],
    ],
    J: [
        [0, 1, 0],
        [0, 1, 0],
        [1, 1, 0],

    ],
    L: [
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 1],
    ],
    S: [
        [ 0, 1, 1],
        [ 1, 1, 0],
        [ 0, 0, 0],

    ],
    Z: [
        [ 1, 1, 0],
        [ 0, 1, 1],
        [ 0, 0, 0],
    ]
}

const tetramino = new Tetramino()

export default tetramino