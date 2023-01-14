#include "Text.h"

Text::Text() {
	title = "Lorem, ipsum.";
	text = "Lorem ipsum, dolor sit amet consectetur adipisicing elit. ,. Facere atque dolores repellat dolorum sed nesciunt quas dolorem ex magni iure nostrum dignissimos non suscipit obcaecati illum adipisci a quae doloremque modi facilis voluptatum debitis, officiis sequi. Cumque mollitia optio recusandae dignissimos. Hic perspiciatis voluptas tempore! Iste deleniti dicta architecto aliquid optio facilis adipisci nulla mollitia? Provident numquam quasi sint mollitia! Corporis qui modi hic iusto accusantium quos aliquid! Nisi consequuntur harum ad non iure sapiente alias eos atque illum voluptatem quis, aut ipsa quo sunt, deleniti, commodi tempore est neque fuga quia dolorum accusamus rerum laboriosam! Totam beatae est nesciunt voluptates maxime corporis fugit a nulla sit optio tempore, fuga natus, libero quis architecto dolorem excepturi! Vitae, odio eaque provident distinctio nisi dolore alias placeat temporibus assumenda mollitia quaerat illum accusantium eos sint facere, qui, vel nobis. Facilis, exercitationem obcaecati reiciendis, cumque aut quia odit quisquam aliquid in fuga rem excepturi eaque explicabo, aperiam provident neque. Nisi cum, debitis aspernatur itaque, amet pariatur, sapiente odit iure minus animi necessitatibus harum commodi ab reprehenderit officiis eveniet laborum architecto facilis est? Natus atque debitis fugiat at eos inventore. Rem, suscipit quasi ipsum fugit deleniti dignissimos corporis natus nostrum beatae explicabo nemo ea officiis molestias doloribus saepe id aliquam? Praesentium repellendus molestias corrupti exercitationem adipisci nemo nulla eum tenetur maiores assumenda, cum accusamus nostrum sequi optio soluta sit et iusto officiis quaerat provident ad eos magni quas. Quam et placeat expedita. Tempore earum blanditiis maiores id pariatur provident distinctio doloribus quia fugiat accusamus totam corporis obcaecati illum ex aut aspernatur voluptate repudiandae, est animi? Quasi, harum repudiandae velit neque officiis odio deserunt itaque id commodi perspiciatis ratione sit maxime odit facere autem, eius asperiores accusantium tenetur quos recusandae magni eaque saepe debitis obcaecati. Doloremque maiores neque consequatur voluptatum, pariatur exercitationem. Praesentium, nobis reiciendis iusto voluptatum nihil veniam ipsa aliquid quaerat dolor assumenda nisi id animi. Mollitia dolorem debitis magni consequatur, alias ipsa totam, et, accusamus molestias ex eos voluptate esse. Dicta quia voluptatem similique saepe maiores, minus quam eligendi consequatur odio autem magni! Aspernatur cupiditate asperiores minus sit molestias ullam explicabo officiis? Aut earum repellendus dolores, excepturi natus animi maiores voluptates explicabo tenetur quasi quo architecto doloremque optio a beatae necessitatibus sint ipsa quisquam nulla harum! Vitae repellat quibusdam unde magni dignissimos officiis delectus enim est! Deleniti iste nisi facilis eum quam in non saepe error mollitia laudantium, earum nam doloribus at debitis necessitatibus, dolor ducimus consectetur esse, a quae officia explicabo. Possimus dolorem harum quasi enim neque, fuga cumque rerum eius officia ea!";
	ps = "dolor sit amet";
}
Text::Text(string title, string text, string ps) {
	this->title = title;
	this->text = text;
	this->ps = ps;
}
Text::Text(const Text& txt) {
	this->title = txt.title;
	this->text = txt.text;
	this->ps = txt.ps;
}
void Text::TO_SET_TITLE(string title) { this->title = title; }
void Text::TO_SET_TEXT(string text) { this->text = text; }
void Text::TO_SET_PS(string ps) { this->ps = ps; }
void Text::TO_SHOW_TEXT() {
	for (int i = 0; i < line / 2 - title.size() / 2; i++) cout << ' ';
	cout << title;
	for (int i = 0; i < 5; i++) cout << ' ';
	for (int i = 0; i < text.size(); i++)
		if (i % line == 0) cout << endl;
		else cout << text[i];
	cout << '\n';
	for (int i = 0; i < line - 10 - ps.size(); i++) cout << ' ';
	cout << ps << '\n';
}
int Text::COUNT() {
	return title.size() + text.size() + ps.size();
}
int Text::COUNT(char chr) {
	int resault = 0;
	for (int i = 0; i < title.size(); i++)
		if (title[i] == chr) resault++;
	for (int i = 0; i < text.size(); i++)
		if (text[i] == chr) resault++;
	for (int i = 0; i < ps.size(); i++)
		if (ps[i] == chr) resault++;
	return resault;
}
int Text::COUNT(char chr, int ln) {
	int resault = 0;
	for (int i = ln * line - 1; i < (ln + 1) * line - 1 || text.size() == i; i++)
		if (text[i] == chr) resault++;
	return resault;
}