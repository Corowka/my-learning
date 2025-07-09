#pragma once
#include<iostream>

class QueueList {
private: 
	struct NodeQueue {
		double data;
		NodeQueue* next;
	};
	NodeQueue* Back;
	NodeQueue* Front;
public:
	QueueList() {
		Back = NULL;
		Front = NULL;
	}
	~QueueList() {};
	void push(double data) {
		if (Front == NULL) {
			Front = Back = new NodeQueue;
			Front->data = data;
			Front->next = NULL;
		}
		else {
			NodeQueue* temp = new NodeQueue;
			temp->data = data;
			temp->next = NULL;
			Front->next = temp;
			Front = temp;
		}
	}
	double pop() {
		double data = 0;
		if (Front == NULL)
			std::cerr << "Queue is empty." << std::endl;
		else {
			data = Back->data;
			NodeQueue* p = Back;
			Back = Back->next;
			delete p;
		}
		return data;
	}
	void print() {
		if (Front == NULL)
			std::cerr << "Queue is empty." << std::endl;
		else
			for (NodeQueue* p = Back; p != NULL; p = p->next)
				std::cout << p->data << " ";
		std::cout << std::endl;
	}
	double front() {
		double data = 0;
		if (Front == NULL)
			std::cerr << "Queue is empty." << std::endl;
		else
			data = Front->data;
		return data;
	}
	double back() {
		double data = 0;
		if (Front == NULL)
			std::cerr << "Queue is empty." << std::endl;
		else
			data = Back->data;
		return data;
	}
	unsigned size() {
		unsigned size = 0;
		if (Front != NULL)
			for (NodeQueue* p = Back; p != NULL; p = p->next)
				size++;
		return size;
	}
	bool empty() {
		return ((Front == NULL) ? 1 : 0);
	}
};