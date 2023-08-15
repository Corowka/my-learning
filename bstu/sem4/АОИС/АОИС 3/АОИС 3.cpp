#include <iostream>
#include <iomanip>
#include <vector> 

using namespace std;

vector<vector<int>> matrixMultiply(vector<vector<int>> a,vector<vector<int>> b) {
    int rowsA = a.size();
    int colsA = a[0].size();
    int rowsB = b.size();
    int colsB = b[0].size();
    if (colsA != rowsB) cerr << "Matrices cannot be multiplied!";
    vector<vector<int>> result(rowsA, vector<int>(colsB));
    for (int i = 0; i < rowsA; i++)
        for (int j = 0; j < colsB; j++) {
            int sum = 0.0;
            for (int k = 0; k < colsA; k++) {
                sum += a[i][k] * b[k][j];
            }
            result[i][j] = sum;
        }
    return result;
}

vector<vector<int>> matrixTranspose(vector<vector<int>> matrix) {
    int rows = matrix.size();
    int cols = matrix[0].size();
    vector<vector<int>> result(cols, vector<int>(rows));
    for (int i = 0; i < rows; i++)
        for (int j = 0; j < cols; j++)
            result[j][i] = matrix[i][j];
    return result;
}

void matrixPrint(vector<vector<int>> m) {
    for (int h1 = 0; h1 < m.size(); h1++) {
        for (int h = 0; h < m[h1].size(); h++)
            cout << setw(2) << m[h1][h] << ' ';
        cout << endl;
    }
}

class BAM {

private:

    vector<vector<int>> x_;
    vector<vector<int>> y_;
    vector<vector<int>> w_;

public:

    void FIT(vector<vector<int>> x, vector<vector<int>> y) {
        w_ = matrixMultiply(matrixTranspose(x), y);
    }

    vector<vector<int>> PREDICT_X(vector<vector<int>> y) {
        vector<vector<int>> x = matrixMultiply(y, matrixTranspose(w_));
        for (int i = 0; i < x.size(); i++)
            for (int j = 0; j < x[i].size(); j++)
                if (x[i][j] <= 0) x[i][j] = -1;
                else x[i][j] = 1;
        return x;
    }

    vector<vector<int>> PREDICT_Y(vector<vector<int>> x) {
        vector<vector<int>> y = matrixMultiply(x, w_);
        for (int i = 0; i < y.size(); i++)
            for (int j = 0; j < y[i].size(); j++)
                if (y[i][j] <= 0) y[i][j] = -1;
                else y[i][j] = 1;
        return y;
    }

    vector<vector<int>> RELAX_X(vector<vector<int>> y_) {
        vector<vector<int>> x_old = PREDICT_X(y_);
        vector<vector<int>> y = PREDICT_Y(x_old);
        vector<vector<int>> x_new = PREDICT_X(y);
        bool flag;
        do {
            flag = false;
            for (int i = 0; i < x_new.size(); i++) {
                for (int j = 0; j < x_new[i].size(); j++)
                    if (x_old[i][j] != x_new[i][j]) {
                        flag = true;
                        break;
                    }
                if (flag == true)break;
            }
            x_old = x_new;
            y = PREDICT_Y(x_old);
            x_new = PREDICT_X(y);
        } while (flag);
        return x_new;
    }

    vector<vector<int>> RELAX_Y(vector<vector<int>> x_) {
        vector<vector<int>> y_old = PREDICT_Y(x_);
        vector<vector<int>> x = PREDICT_X(y_old);
        vector<vector<int>> y_new = PREDICT_Y(x);
        bool flag;
        do {
            flag = false;
            for (int i = 0; i < y_new.size(); i++) {
                for (int j = 0; j < y_new[i].size(); j++)
                    if (y_old[i][j] != y_new[i][j]) {
                        flag = true;
                        break;
                    }
                if (flag == true)break;
            }
            y_old = y_new;
            x = PREDICT_X(y_old);
            y_new = PREDICT_Y(x);
        } while (flag);
        return y_new;
    }

};

int main()
{
    vector<vector<int>> x = {
        {-1, -1, -1, -1},
        {-1,  1, -1,  1},
        { 1,  1,  1,  1}
    };
    vector<vector<int>> y = {
        {-1, -1},
        {-1,  1},
        { 1,  1}
    };
    cout << "X_input:\n";
    matrixPrint(x);
    cout << "y_input:\n";
    matrixPrint(y);
    BAM bam;
    bam.FIT(x, y);
    cout << "X_output:\n";
    matrixPrint(bam.RELAX_X(y));
    cout << "y_output:\n";
    matrixPrint(bam.RELAX_Y(x));
}
