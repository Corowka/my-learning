%{
#include <stdio.h>
#include <stdlib.h>
#include <ctype.h>
#include <string.h>

void yyerror(const char *s);
int yylex();

int yylval;  // Declare yylval to store token values
%}

%token IDENTIFIER NUMBER
%token WHILE DO ASSIGN
%token AND OR
%token EQ NEQ LT GT LE GE

%left OR
%left AND
%left EQ NEQ LT GT LE GE
%left '+' '-'
%left '*' '/'

%%
program:
    program statement ';'
    | statement ';'
    ;

statement:
    while_statement
    | assignment_statement
    ;

while_statement:
    WHILE logical_expression DO assignment_statement
    ;

logical_expression:
    logical_expression AND logical_expression
    | logical_expression OR logical_expression
    | '(' logical_expression ')'
    | comparison
    ;

comparison:
    expression EQ expression
    | expression NEQ expression
    | expression LT expression
    | expression GT expression
    | expression LE expression
    | expression GE expression
    ;

assignment_statement:
    IDENTIFIER ASSIGN expression
    ;

expression:
    IDENTIFIER
    | NUMBER
    ;

%%

// Simple lexer function
// Усовершенствованная функция лексера
// Усовершенствованная функция лексера
int yylex() {
    int c;

    while ((c = getchar()) != EOF) {
        // Пропускаем пробельные символы
        if (isspace(c)) continue;

        // Проверка на ключевые слова и идентификаторы
        if (isalpha(c)) {
            char buffer[100];
            int i = 0;

            // Считываем символы, пока они алфавитные или цифровые (идентификатор)
            do {
                buffer[i++] = c;
                c = getchar();
            } while (isalnum(c) || c == '_'); // Добавляем поддержку символа '_'
            buffer[i] = '\0'; // Завершаем строку

            ungetc(c, stdin); // Возвращаем последний символ в поток

            // Сравниваем со словами "while" и "do"
            if (strcmp(buffer, "while") == 0) {
                printf("Token: WHILE\n");
                return WHILE;
            } else if (strcmp(buffer, "do") == 0) {
                printf("Token: DO\n");
                return DO;
            } else {
                printf("Token: IDENTIFIER (%s)\n", buffer);
                return IDENTIFIER;
            }
        }

        // Числа
        if (isdigit(c)) {
            yylval = c - '0';
            while (isdigit(c = getchar()))
                yylval = yylval * 10 + (c - '0');
            ungetc(c, stdin);
            printf("Token: NUMBER (%d)\n", yylval);
            return NUMBER;
        }

        // Операторы и символы
        switch (c) {
            case '=': 
                if ((c = getchar()) == '=') {
                    printf("Token: EQ\n");
                    return EQ;
                }
                ungetc(c, stdin);
                printf("Token: ASSIGN\n");
                return ASSIGN; // Если это просто '=', это оператор присваивания
            case '!': 
                if ((c = getchar()) == '=') {
                    printf("Token: NEQ\n");
                    return NEQ;
                }
                ungetc(c, stdin);
                break;
            case '<': 
                if ((c = getchar()) == '=') {
                    printf("Token: LE\n");
                    return LE;
                }
                ungetc(c, stdin);
                printf("Token: LT\n");
                return LT;
            case '>': 
                if ((c = getchar()) == '=') {
                    printf("Token: GE\n");
                    return GE;
                }
                ungetc(c, stdin);
                printf("Token: GT\n");
                return GT;
            case '&': 
                if ((c = getchar()) == '&') {
                    printf("Token: AND\n");
                    return AND;
                }
                ungetc(c, stdin);
                break;
            case '|': 
                if ((c = getchar()) == '|') {
                    printf("Token: OR\n");
                    return OR;
                }
                ungetc(c, stdin);
                break;
            case '+': 
            case '-': 
            case '*': 
            case '/': 
                printf("Token: '%c'\n", c);
                return c;
            case ';': 
                printf("Token: ';'\n");
                return ';';
            default:
                printf("Unknown character: '%c'\n", c);
                break;
        }
    }
    return 0;  // Конец ввода
}

void yyerror(const char *s) {
    fprintf(stderr, "Error: %s\n", s);
}

int main() {
    int parseResult = yyparse();
    return parseResult;
}