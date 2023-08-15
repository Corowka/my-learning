#include "Table.h"

Table::Table() : BaseTable() {}

Table::Table(int const& size, int const& columns) : BaseTable(size, columns) {}

Table::Table(const std::vector<std::vector<std::string>>& values)
{
	size_ = values.end() - values.begin();
	columns_ = 0;
	for (int i = 0; i < size_; i++)
	{
		unsigned col = values[i].size();
		columns_ = std::max(columns_, col);
	}
	table_ = std::vector<std::vector<std::string*>>(size_);
	for (int id = 0; id < size_; id++)
	{
		table_[id] = std::vector<std::string*>(columns_, nullptr);
		insert(values[id]);
	}
}

bool Table::insert(const std::vector<std::string>& value)
{
	int val_size = value.size();
	for (int i = 0; i < size_; i++)
	{
		if (table_[i][0] == nullptr)
		{
			std::vector<std::string*> val(columns_, nullptr);
			for (int j = 0; j < val_size; j++)
			{
				val[j] = new std::string(value[j]);
			}
			table_[i] = val;
			return true;
		}
	}
	std::vector<std::string*> row(columns_, nullptr);
	for (int j = 0; j < val_size; j++)
	{
		row[j] = new std::string(value[j]);
	}
	table_.push_back(row);
	size_++;
	valuesCounter_++;
	return true;
}

bool Table::remove(const std::string& value)
{
	int id = search(value);
	if (id == -1)
	{
		return false;
	}
	for (int j = 0; j < columns_; j++)
	{
		table_[id][j] = nullptr;
	}
	valuesCounter_--;
	size_--;
	return true;
}

int Table::search(const std::string& value)
{
	for (int id = 0; id < size_; id++)
	{
		if (table_[id][0] == nullptr)
		{
			continue;
		}
		if (*table_[id][0] == value)
		{
			return id;
		}
	}
	return -1;
}

bool Table::replace(const std::vector<std::string>& old_value,
	const std::vector<std::string>& new_value)
{
	if (old_value.size() < new_value.size())
	{
		return false;
	}
	int id = search(old_value[0]);
	int val_len = new_value.size();
	for (int j = 0; j < val_len || j < columns_; j++)
	{
		table_[id][j] = new std::string(new_value[j]);
	}
	return true;
}