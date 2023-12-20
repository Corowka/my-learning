#pragma once
#include "BaseTable.h"

class HashTable : public BaseTable
{
private:

	unsigned collisionCounter_;
	unsigned allValCounter_;
	unsigned m_;
	std::vector<bool> collision_mask_;

public:

	HashTable();

	HashTable(int const& size, int const& columns);
	
	HashTable(const std::vector<std::vector<std::string>>& values);

	HashTable(const HashTable& obj);

	~HashTable();

	unsigned long long hash_XOR(const std::string& value);

	unsigned long long hash_Div(const std::string& value);

	bool insert(const std::vector<std::string>& value) override;

	bool remove(const std::string& value) override;

	int search(const std::string& value) override;

	bool replace(const std::vector<std::string>& old_value,
		const std::vector<std::string>& new_value) override;

	float collision_info();

	std::vector<bool> collision_mask();

	void draw_collision();

};

