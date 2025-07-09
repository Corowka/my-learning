#pragma once
#include<iostream>

class StackList {
private:
	struct NodeStack {
		double data;
		NodeStack* next;
	};
	NodeStack* Top;
public :
	StackList() {
		Top = NULL;
	};
	~StackList() {
		
	};
	void push(double data) {
		if (Top == NULL) {
			Top = new NodeStack;
			Top->data = data;
			Top->next = NULL;
		}
		else {
			NodeStack* temp = new NodeStack;
			temp->data = data;
			temp->next = NULL;
			NodeStack* p;
			for (p = Top; p->next != NULL; p = p->next);
			p->next = temp;
		}
	}
	double pop() {
		double data;
		if (Top == NULL) {
			std::cerr << "Stack is empty." << std::endl;
			data = 0;
		}
		else {
			NodeStack* temp;
			for (NodeStack* p = Top;; p = p->next) {
				temp = p->next;
				if (temp->next == NULL) {
					data = temp->data;
					p->next = NULL;
					delete temp;
					break;
				}
			}
		}
		return data;
	}
	double top() {
		double data = 0;
		if (Top == NULL)
			std::cerr << "Stack is empty." << std::endl;
		else 
			for (NodeStack* p = Top; p->next != NULL; p = p->next)
				data = p->data;
		return data;
	}
	unsigned size() {
		unsigned size = 0;
		if (Top != NULL)
			for (NodeStack* p = Top; p != NULL; p = p->next)
				size++;
		return size;
	}
	bool empty() {
		return ((Top == NULL) ? 1 : 0);
	}
	void print() {
		if (Top == NULL)
			std::cerr << "Stack is empty." << std::endl;
		else {
			for (NodeStack* p = Top; p != NULL; p = p->next)
				std::cout << p->data << " ";
			std::cout << std::endl;
		}
	}
};

