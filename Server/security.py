from Crypto.Cipher import AES
from Crypto.Random import get_random_bytes
import base64
from bitstring import BitArray
import zlib
from Crypto import Random
from Crypto.Util.Padding import pad
import math
import random
from crc8 import crc8


def calculate_crc8(data: bytes):
    crc = 0

    for byte in data:
        crc ^= byte
        for _ in range(8):
            if crc & 0x80:
                crc = (crc << 1) ^ 0x07
            else:
                crc <<= 1

    return format(crc & 0xFF, "02X")


class WorkingTime:
    infinity = "infinity"

    def __init__(self) -> None:
        pass


def GenerateCRC32(data: bytes):
    return zlib.crc32(data).to_bytes(4, "big").hex().upper()


key = base64.b64decode(
    "0FKx0FOjdBz4zRtoPRxI6g=="
)  # get_random_bytes(16)  # get_random_bytes(16)

unkey = get_random_bytes(16)


nonce = base64.b64decode("Wdki6qa7TcuLSg7QFbWjpQ==")


def vigenere_encrypt_bytes(plain_bytes, key):
    encrypted_bytes = bytearray()
    key_length = len(key)

    for i in range(len(plain_bytes)):
        byte = plain_bytes[i]

        # Determine the shift based on the corresponding key byte
        shift = key[i % key_length]

        # Apply the shift to the current byte
        encrypted_byte = (byte + shift) % 256
        encrypted_bytes.append(encrypted_byte)

    return bytes(encrypted_bytes)


def vigenere_decrypt_bytes(encrypted_bytes, key):
    decrypted_bytes = bytearray()
    key_length = len(key)

    for i in range(len(encrypted_bytes)):
        byte = encrypted_bytes[i]

        # Determine the shift based on the corresponding key byte
        shift = key[i % key_length]

        # Apply the shift to the current byte
        decrypted_byte = (byte - shift) % 256
        decrypted_bytes.append(decrypted_byte)

    return bytes(decrypted_bytes)


# idsFromBytes = GenerateStringFromIDs(ids, 5)
#
# print(idsFromBytes, "idsFromBytes")
#
# scenariosKey = GenerateScenarioKey(idsFromBytes, 5)
#
# string_keys = []
# print(scenariosKey[0], "Scenario Key")
#
# for i in scenariosKey:
#    string_keys.append(i.hex().upper())
#
# print("-".join(string_keys))

# for i in scenariosKey:
#    print(i)
#
# decrypt = vigenere_decrypt_bytes(scenariosKey, key)
#
# print(decrypt)
#
# for i in decrypt:
#    print(i)
#


class Key:
    def __init__(self, client_key: str, scenarios: list, time):
        self.random_key = get_random_bytes(2)
        self.salt = b""
        self.time = time
        self.client_key = client_key
        # print(len(self.salt), "lenSalt")
        self.scenarios_states = ""
        self.blockSize = 3
        max_value = (
            0 if len(scenarios) == 0 else max(scenarios, key=lambda x: x["id"])["id"]
        )
        if len(scenarios) == 1 and scenarios[0]["id"] == 0:
            max_value = 1
        self.scenarios_states_bytes = bytearray(self.salt)
        self.size = math.ceil(
            (max_value + len(self.salt) * 8) / (self.blockSize * 8)
        ) * (self.blockSize * 8)
        self.scenarios_states = self.scenarios_states.zfill(self.size)
        scenarios_states_array = list(self.scenarios_states)
        for i in range(len(scenarios_states_array)):  # range(self.size):
            # scenarios_states_array[i] = scenarios[i]["id"]
            for scenario in scenarios:
                if scenario["id"] == i:
                    scenarios_states_array[i] = "1"
        self.scenarios_states = "".join(scenarios_states_array)
        # self.scenarios_states += str(random.randint(0, 1))

        self.scenarios_states = self.scenarios_states[
            0 : len(self.scenarios_states) - len(self.salt) * 8
        ]
        for i in self.scenarios_states:
            i = str(random.randint(0, 1))
        self.scenarios = self.GenerateBytesScenarios(self.scenarios_states)
        self.activation_key = self.GenerateKey()

    # def RandomFilling(self):
    def GetScenarios(self):
        return self.scenarios_states

    def GetTime(self):
        time: int = self.time
        return time.to_bytes(2, "little", signed=True)

    def GenerateBytesScenarios(self, scenario_states: str):
        bit_string = ""
        result = bytearray(self.salt)
        for i in scenario_states:
            bit_string += i
            if len(bit_string) == 8:
                result.append(int(bit_string, 2))
                bit_string = ""

        encrypt_string = vigenere_encrypt_bytes(result, self.random_key).hex()
        encrypt_array = []
        for i in range(
            self.blockSize * 2,
            len(encrypt_string) + self.blockSize * 2,
            self.blockSize * 2,
        ):
            encrypt_array.append(encrypt_string[i - self.blockSize * 2 : i])

        return (
            encrypt_string
            if len(encrypt_string) == self.blockSize * 2
            else "-".join(encrypt_array)
        )

    def GenerateKey(self):
        # key = f"{zlib}"
        client_key_split = "".join(
            self.client_key.split("-")[: len(self.client_key.split("-")) - 1]
        )

        client_crc8 = calculate_crc8(
            "".join(
                self.client_key.split("-")[: len(self.client_key.split("-")) - 1]
            ).encode()
        )

        if client_crc8 != self.client_key.split("-")[-1]:
            return ""
        # return self.client_key

        # return calculate_crc8("".join(self.client_key.split("-")[:len(self.client_key.split("-")) - 1]).encode())

        # return crc8().update()

        crc_client = calculate_crc16(client_key_split.encode())
        key_array = [
            crc_client,
            self.random_key.hex().upper(),
            vigenere_encrypt_bytes(self.GetTime(), self.random_key).hex().upper(),
        ]

        if self.scenarios_states != "":
            key_array.append(self.scenarios.upper())

        print("".join(key_array))
        all_crc = calculate_crc16("".join(key_array).replace("-", "").encode())
        key_array.append(all_crc)

        return "-".join(key_array)

    def GetActivationKey(self):
        return self.activation_key


# 16


# keytest.GetScenarios()


# def crc16(data: bytes):
#    xor_in = 0x0000  # initial value
#    xor_out = 0x0000  # final XOR value
#    poly = 0x8005  # generator polinom (normal form)
#
#    reg = xor_in
#    for octet in data:
#        # reflect in
#        for i in range(8):
#            topbit = reg & 0x8000
#            if octet & (0x80 >> i):
#                topbit ^= 0x8000
#            reg <<= 1
#            if topbit:
#                reg ^= poly
#        reg &= 0xFFFF
#        # reflect out
#    return (reg ^ xor_out).to_bytes(2, "little").hex().upper()


def calculate_crc16(data):
    crc = 0xFFFF  # Initial value
    polynomial = 0xA001  # CRC-16 polynomial

    for byte in data:
        crc ^= byte
        for _ in range(8):
            if crc & 0x0001:
                crc = (crc >> 1) ^ polynomial
            else:
                crc >>= 1

    return format(crc, "04X")
