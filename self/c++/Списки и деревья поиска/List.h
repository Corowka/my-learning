#pragma once
#include <iostream>

class List {

struct Node
    {
        Node() {}

        int value;                 
        Node* Next; 
        Node* Prev; 

        ~Node() {}
    };

    Node* Head; 
    Node* Tail; 

public:
    List() {
        Head = NULL;
        Tail = NULL;
    }
    ~List() {
        while (Head)                      
        {
            Tail = Head->Next;          
            delete Head;                
            Head = Tail;                
        }
    }

    void Add(int value)
    {
        Node* Temp = new Node;           
        Temp->Next = NULL;           
        Temp->value = value;

        if (Head != NULL)                    
        {
            Temp->Prev = Tail;
            Tail->Next = Temp;             
            Tail = Temp;                    
        }
        else
        {
            Temp->Prev = NULL;            
            Head = Tail = Temp;             
        }
    }

    void Show(bool reverse) {  
        if (reverse == false) for (Node* Temp = Head; Temp != NULL; Temp = Temp->Next) std::cout << Temp->value << " ";
        else for (Node* Temp = Tail; Temp != NULL; Temp = Temp->Prev) std::cout << Temp->value << " ";
        std::cout << std::endl;
    }

    int Size() {
        int Count = 0;
        for (Node* Temp = Head; Temp != NULL; Temp = Temp->Next) Count++;
        return Count;
    }

    int* CreateArray(int* (&n), int size) {
        n = new int[size];
        int i = 0;
        for (Node* Temp = Head; Temp != NULL; Temp = Temp->Next) {
            n[i] = Temp->value;
            i++;
        }
        return n;
    }

    int Sum(bool condition(int)) {
        int Count = 0;
        for (Node* Temp = Head; Temp != NULL; Temp = Temp->Next) if (condition(Temp->value)) Count += Temp->value;
        return Count;
    }
};