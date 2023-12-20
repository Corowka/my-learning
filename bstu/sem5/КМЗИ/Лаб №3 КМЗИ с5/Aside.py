import socket
import random
from RabinSignature import RabinSignature


def start_server():
    random.seed(117)
    server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server_address = ('localhost', 12345)
    server_socket.bind(server_address)
    server_socket.listen(1)

    print("Сервер запущен. Ожидание подключения...")
    print("Создание объекта цифровой подписи...")

    sinature = RabinSignature(1024)

    print("Генерация открытого ключа p и q...")

    p, q = sinature.get_public_keys()
    client_socket, client_address = server_socket.accept()

    print(f"Подключено к {client_address}")

    def string_to_binary(input_string):
        binary_string = ''.join(format(ord(char), '08b') for char in input_string)
        return binary_string

    msg = "Hello World"
    msg_bin = string_to_binary("Hello World")

    print("Генерация подписи U, x...")

    U, x = sinature.get_signature(msg_bin, p, q)

    print(f"msg = {msg_bin}")
    print(f"p = {p}")
    print(f"q = {q}")
    print(f"U = {U}")
    print(f"x = {x}")
    print(f"sinature.verify = {sinature.verify(p, q, U, x, msg_bin)}")

    print(f"Отправка сообщения и ключей p, q, U, x для проверки: {', '.join([msg, str(p), str(q), str(U), str(x)])}")

    client_socket.sendall(',,'.join([msg, str(p), str(q), str(U), str(x)]).encode('utf-8'))
    client_socket.close()
    server_socket.close()


if __name__ == "__main__":
    start_server()