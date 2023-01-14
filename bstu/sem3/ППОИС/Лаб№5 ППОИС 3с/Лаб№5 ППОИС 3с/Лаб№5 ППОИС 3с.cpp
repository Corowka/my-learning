#include "Pistol.h"
#include "Rifle.h"

int main()
{
    srand(time(NULL));
    
    Pistol USP(10, 0.456);
    cout << USP.SHOOT() << endl;
    Rifle M4(28, 0.634);
    cout << M4.SHOOT() << endl;

    USP.ADD_SCOPE();
    M4.ADD_SCOPE();
    M4.ADD_LENGTH(97);

    cout << USP.SHOOT() << endl;
    cout << M4.SHOOT() << endl;
}
