#include "AdditiveGenerator.h"

int main()
{
	AdditiveGenerator g(30);
	std::cout << "Generated key with size 32 bits: " << g.generate(1, 2, 32) << std::endl;
	std::cout << "Period of generator: " << g.calc_period() << std::endl;
	std::cout << "Hist mean: " << g.hist(1000);
}