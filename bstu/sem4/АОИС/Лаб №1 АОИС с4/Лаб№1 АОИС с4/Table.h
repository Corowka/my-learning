#pragma once
#include "BaseTable.h"

class Table : public BaseTable
{
public:

	Table();

	Table(int const& size, int const& columns);

	Table(const std::vector<std::vector<std::string>>& values);

	bool insert(const std::vector<std::string>& value) override;

	bool remove(const std::string& value) override;

	int search(const std::string& value) override;

	bool replace(const std::vector<std::string>& old_value,
		const std::vector<std::string>& new_value) override;

};

