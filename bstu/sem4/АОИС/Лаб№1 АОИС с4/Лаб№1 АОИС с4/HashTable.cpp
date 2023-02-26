#include "HashTable.h"

bool isSimple(const int& num)
{
	int n = num / 2 + 1;
	for (int i = 2; i < n; i++)
	{
		if (num % i == 0)
		{
			return false;
		}
	}
	return true;
}

int M(const int& size)
{
	int m = size;
	bool is_k_found = false;
	while (is_k_found)
	{
		if (!isSimple(m))
		{
			m--;
			continue;
		}
		for (int i = 256; i < m; i *= 256)
		{
			if (i == m)
			{
				m--;
				continue;
			}
		}
		is_k_found = true;
	}
	return m;
}

HashTable::HashTable()
{
	size_ = 20;
	columns_ = 3;
	valuesCounter_ = 0;
	allValCounter_ = 0;
	collisionCounter_ = 0;
	m_ = 19;
	table_ = std::vector<std::vector<std::string*>>(size_);
	for (int i = 0; i < size_; i++)
	{
		table_[i] = std::vector<std::string*>(columns_, nullptr);
	}
};

HashTable::HashTable(const int& size, const int& columns)
{
	size_ = size;
	columns_ = columns;
	valuesCounter_ = 0;
	allValCounter_ = 0;
	collisionCounter_ = 0;
	m_ = M(size_);
	table_ = std::vector<std::vector<std::string*>>(size_);
	for (int i = 0; i < size_; i++)
	{
		table_[i] = std::vector<std::string*>(columns_, nullptr);
	}
}

HashTable::HashTable(const std::vector<std::vector<std::string>>& values)
{
	valuesCounter_ = 0;
	allValCounter_ = 0;
	collisionCounter_ = 0;
	int values_size = values.end() - values.begin();
	size_ = int(values_size * 1.5);
	m_ = M(size_);
	columns_ = 0;
	for (int i = 0; i < values_size; i++)
	{
		unsigned col = values[i].size();
		columns_ = std::max(columns_, col);
	}
	table_ = std::vector<std::vector<std::string*>>(size_);
	for (int id = 0; id < size_; id++)
	{
		table_[id] = std::vector<std::string*>(columns_, nullptr);
	}
	for (int id = 0; id < values_size; id++)
	{
		insert(values[id]);
	}
}

HashTable::HashTable(const HashTable& obj) : BaseTable(obj)
{
	collisionCounter_ = obj.collisionCounter_;
	allValCounter_ = obj.allValCounter_;
	m_ = obj.m_;
	collision_mask_ = obj.collision_mask_;
}

HashTable::~HashTable() {}

unsigned long long HashTable::hash_XOR(const std::string& value)
{
	int length = std::size(value);
	unsigned long long hash = 0;
	for (int i = 0; i < length; i++) {
		hash = (hash << 1) ^ (value[i]);
	}
	return hash % size_;
}

unsigned long long HashTable::hash_Div(const std::string& value)
{
	int length = std::size(value);
	int hash = 0;
	for (int i = 0; i < length; i++)
	{
		hash += value[i];
	}
	
	return hash % m_;
}

bool HashTable::insert(const std::vector<std::string>& value)
{
	valuesCounter_++;
	allValCounter_++;
	int val_size = value.size();
	unsigned long long hash = hash_XOR(value[0]);
	unsigned long long step = hash_Div(value[0]);
	if (table_[hash][0] == nullptr)
	{
		for (int j = 0; j < val_size || j < columns_; j++)
		{
			table_[hash][j] = new std::string(value[j]);
		}
		collision_mask_.push_back(false);
		return true;
	}
	collision_mask_.push_back(true);
	collisionCounter_++;
	for (int i = 0; i < size_; i++)
	{
		hash = (hash + step) % size_;
		if (table_[hash][0] == nullptr)
		{
			for (int j = 0; j < val_size || j < columns_; j++)
			{
				table_[hash][j] = new std::string(value[j]);
			}
			return true;
		}
	}
	hash = hash_XOR(value[0]);
	std::cout << "[WARNING] Value [" << *table_[hash][0] << "] was replaced with [" << value[0] << "].\n";
	for (int j = 0; j < val_size || j < columns_; j++)
	{
		table_[hash][j] = new std::string(value[j]);
	}
	return false;
}

bool HashTable::remove(const std::string& value)
{
	int id = search(value);
	if (id != -1)
	{
		for (int j = 0; j < columns_; j++)
		{
			table_[id][j] = nullptr;
		}
		valuesCounter_--;
		return true;
	}
	return false;
}

int HashTable::search(const std::string& value)
{
	unsigned long long hash = hash_XOR(value);
	unsigned long long step = hash_Div(value);
	if (table_[hash][0] != nullptr && *table_[hash][0] == value)
	{
		return hash;
	}
	for (int i = 0; i < size_; i++)
	{
		hash = (hash + step) % size_;
		if (table_[hash][0] != nullptr && *table_[hash][0] == value)
		{
			return hash;
		}
	}
	return -1;
}

bool HashTable::replace(const std::vector<std::string>& old_value,
	const std::vector<std::string>& new_value)
{
	int id = search(old_value[0]);
	if (id == -1)
	{
		return false;
	}
	remove(old_value[0]);
	insert(new_value);
	return true;
}

float HashTable::collision_info()
{
	return float(collisionCounter_) / allValCounter_ * 100;
}

std::vector<bool> HashTable::collision_mask()
{
	return collision_mask_;
}

void HashTable::draw_collision()
{
	int plot_size = collision_mask_.size();
	char** plot = new char*[plot_size];
	for (int i = 0; i < plot_size; i++)
	{
		plot[i] = new char[plot_size];
	}
	int high = 0;
	for (int i = 0; i < plot_size; i++)
	{
		for (int j = 0; j < plot_size; j++)
		{
			plot[i][j] = ' ';
		}
	}
	for (int i = 0; i < plot_size; i++)
	{
		if (collision_mask_[i])
		{
			high++;
		}
		plot[plot_size - high - 1][i] = '+';
	}
	for (int i = plot_size - high - 5; i < plot_size; i++)
	{
		if ((plot_size - i) % 5 == 0)
		{
			std::cout << std::setw(5) << '+';
		} else {
			std::cout << std::setw(5) << '|';
		}
		for (int j = 0; j < plot_size; j++)
		{
			std::cout << plot[i][j];
		}
		std::cout << std::endl;
	}
	std::cout << std::setw(5) << " +";
	for (int i = 0; i < plot_size; i++)
	{
		if ((plot_size - i - 2) % 5 == 0)
		{
			std::cout << '+';
		} else {
			std::cout << '-';
		}
	}
	std::cout << std::setw(10) << ' ' << "Collision: " << (float(collisionCounter_) / allValCounter_ * 100) << '%' << std::endl;
	std::cout << std::endl;
}