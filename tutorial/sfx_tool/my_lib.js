class MyVector2 {
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
    Normalized(){
        var _l = this.Length()
        this.x /= _l;
        this.y /= _l;
    }
    Length(){
        return Math.sqrt(this.x * this.x + this.y * this.y)
    }
    MulNumber(num){
        return new MyVector2(this.x * num, this.y * num);
    }
    Add(other){
        return new MyVector2(this.x + other.x, this.y + other.y);
    }
    Sub(other){
        return new MyVector2(this.x - other.x, this.y - other.y);
    }
}

class MyMatrix{
    constructor(data_table, row, col){
        this.data_tabel = data_table;
        this.row = row;
        this.col = col;
    }

    ShowMatrix(){
        for (var i = 0; i < this.row; i+=1){
            var line_res = "| ";
            for(var j = 0; j < this.col; j+=1){
                var val = this.data_tabel[MyMatrix.RowColToIndex(i,j,this.col)];
                if (j < this.col - 1){
                    line_res +=val + " , "
                }else{
                    line_res +=val + " |"
                }
            }
            console.log(line_res);
        }
        console.log("\n");
    }

    Mul(m){
        if (this.col != m.row){
            return null;
        }
        var ret = new MyMatrix([], this.row, m.col);
        for(var i = 0; i < this.row; i++){
            for(var j = 0; j < m.col; j++){
                var sum = 0;
                for(var k = 0; k < this.col; k++){
                    var res = this.data_tabel[MyMatrix.RowColToIndex(i, k, this.col)] * m.data_tabel[MyMatrix.RowColToIndex(k,j, this.col)];
                    sum += res;
                }
                ret.data_tabel[MyMatrix.RowColToIndex(i,j, this.col)] = sum;
            }
        }
        return ret;
    }
}

MyMatrix.RowColToIndex = function RowColToIndex(i, j, col){
    return i * col + j;
}

function CreateRotation2DMat (tho){
    return new MyMatrix([Math.cos(tho), Math.sin(tho), - Math.sin(tho), Math.cos(tho)], 2, 2)
}

function CreateVector2Matrix(vector2){
    return new MyMatrix([vector2.x, vector2.y], 1, 2);
}

vec2 = new MyVector2(5, 5);
vec2.Normalized()
console.log(vec2.x, vec2.y);
mat1 = new MyMatrix([1, 2, 3, 4, 5, 6, 7, 8, 9], 3, 3)
mat1.ShowMatrix()
mat2 = new MyMatrix([9, 8, 7, 6, 5, 4, 3, 2, 1], 3, 3)
mat2.ShowMatrix()
res = mat1.Mul(mat2);
res.ShowMatrix()

point = CreateVector2Matrix(new MyVector2(0, 1));
rot = CreateRotation2DMat(3.1415926/2)
ret = point.Mul(rot)
ret.ShowMatrix()

function rotate2d(pos, tho){
    rotationMatrix = CreateRotation2DMat(tho);
    var pos_mat = CreateVector2Matrix(pos);
    var ret = pos_mat.Mul(rotationMatrix);
    return new MyVector2(ret.data_tabel[0], ret.data_tabel[1])
}

function init_line_info(pos_list, size){
    var line_half_size = Math.max(1, size/2.0);
    var half_pi = 3.1415925 / 2
    var res = []
    var up_vector, down_vector;
    for (idx=0; idx < pos_list.length - 1; idx++){
        pos1 = new MyVector2(pos_list[idx][0], pos_list[idx][1])
        pos2 = new MyVector2(pos_list[idx+1][0], pos_list[idx+1][1])
        dir = pos2.Sub(pos1);
        dir.Normalized()
        up_vector_dir = rotate2d(dir, half_pi);
        down_vector_dir = rotate2d(dir, -half_pi);
        up_vector = up_vector_dir.MulNumber(line_half_size);
        down_vector = down_vector_dir.MulNumber(line_half_size);
        res[res.length] = pos1.Add(up_vector);
        res[res.length] = pos1.Add(down_vector);
        if (idx == pos_list.length - 2){
            res[res.length] = pos2.Add(up_vector);
            res[res.length] = pos2.Add(down_vector);
        }
    }
    return res;
}

ret = init_line_info([[0, 0], [1, 0]], 2);
console.log(ret);