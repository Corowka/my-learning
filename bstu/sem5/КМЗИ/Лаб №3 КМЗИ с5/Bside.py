import socket
import random
from RabinSignature import RabinSignature


def start_client():
    random.seed(117)
    client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server_address = ('localhost', 12345)
    client_socket.connect(server_address)

    print(f"Соединение успешно установлено")

    sinature = RabinSignature(1024)

    data = client_socket.recv(32768).decode('utf-8')
    msg, p, q, U, x = data.split(',,')

    def string_to_binary(input_string):
        binary_string = ''.join(format(ord(char), '08b') for char in input_string)
        return binary_string

    msg_bin, p, q, U, x = str(string_to_binary(msg)), int(p), int(q), str(U), int(x)
    print(f"Получено сообщение: {msg_bin}")
    print(f"Получено p: {p}")
    print(f"Получено q: {q}")
    print(f"Получено U: {U}")
    print(f"Получено x: {x}")

    print(f"Проверка подписи sinature.verify(p, q, U, x) = {sinature.verify(p, p, U, x, msg_bin)}")

    client_socket.close()


if __name__ == "__main__":
    start_client()
