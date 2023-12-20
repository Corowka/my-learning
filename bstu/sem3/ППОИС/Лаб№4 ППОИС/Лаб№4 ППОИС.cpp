#include "Circle.h"
#include "Line.h"
#include "Square.h"


int main()
{
    Circle R1(10);
    R1.TO_SHOW();
    cout << SECTOR(R1, 30) << endl;
    cout << SEGMENT(R1, 30) << endl;
    DOUBLE(R1);
    R1.TO_SHOW();
    cout << SECTOR(R1, 30) << endl;

    Line AB(15), BC(145);
    AB.TO_SHOW();
    BC.TO_SHOW();
    EXPAND(AB, 4);
    SHORTEN(BC, 6);
    AB.TO_SHOW();
    BC.TO_SHOW();
    STACK_LINES(AB, BC);
    AB.TO_SHOW();

    Square ABCD(15), PSTU(145);
    ABCD.TO_SHOW();
    PSTU.TO_SHOW();
    INCREASE(ABCD, 4);
    DECREASE(PSTU, 6);
    ABCD.TO_SHOW();
    PSTU.TO_SHOW();
    STACK_SQUARES(ABCD, PSTU);
    ABCD.TO_SHOW();
}