#include <iostream>
#include "User.h"
#include "Sum.h"
#include "Text.h"

int main()
{

    // User
    User guest;
    guest.TO_SHOW_NAME();
    guest.TO_SHOW_BALANCE();
    guest.TO_SHOW_OPTIONS();
    string name = guest.TO_GET_NAME();
    double balance = guest.TO_GET_BALANCE();
    int* options = guest.TO_GET_OPTIONS();
    cout << name << endl <<
        balance << endl <<
        options[0] << ' ' <<
        options[1] << ' ' <<
        options[2] << endl;
    int* admin_opt = new int[3];
    admin_opt[0] = 100;
    admin_opt[1] = 70;
    admin_opt[2] = 75;
    User admin("admin", 10.23, admin_opt);
    admin = admin + guest;
    admin.TO_SHOW_NAME();
    admin.TO_SHOW_BALANCE();
    admin.TO_SHOW_OPTIONS();
    cout << (admin == guest) << endl;
    admin = guest;
    cout << (admin == guest) << endl;
    
     //Sum
    cout << '\n';
    Sum c;
    c.TO_SHOW_A();
    c.TO_SHOW_B();
    int a = c.TO_GET_A();
    int b = c.TO_GET_B();
    cout << a << ' ' << b << endl;
    a += 11; b += 21;
    Sum d(a, b, 1);
    d = d + c;
    d.TO_SHOW_A();
    d.TO_SHOW_B();
    cout << (c == d) << endl;
    c = d;
    cout << (c == d) << endl;

    // Лаб2

    Sum sum(2, 2, 3);
    cout << sum.TO_COMPARE() << sum.TO_COMPARE('a', 'b') << sum.TO_COMPARE(1, 2) << endl;

    User man;
    man.EARN(100);
    man.TO_SHOW_BALANCE();
    man.EARN(213.423);
    man.TO_SHOW_BALANCE();
    man.EARN(100, 2);
    man.TO_SHOW_BALANCE();


    Text txt;
    txt.TO_SHOW_TEXT();
    cout << txt.COUNT() << endl;
    cout << txt.COUNT('a') << endl;
    cout << txt.COUNT('a', 5) << endl;
}

