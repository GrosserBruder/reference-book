export function getRandomNumber(max: number, min: number = 0) {
  return Math.floor(Math.random() * (max - min) + min)
}

export function getRandomValue<T>(values: Array<T> = []) {
  const index = getRandomNumber(values.length)

  return values[index];
}

export function getRandomName() {
  const names = ['test', 'name', 'название', 'github', 'gitlab', 'vk', 'google']
  return getRandomValue(names)
}

export function getRandomAddress() {
  const names = ['address.ru', 'test.org', 'адрес.рф', 'yandex.ru', 'vk.com', 'google.com', 'cloud.com']
  return getRandomValue(names)
}

export function getRandomLogin() {
  const names = ['test', 'login', 'логин', 'qwerty', 'q1w2e3r4', 'my-login', 'login', 'admin']
  return getRandomValue(names)
}

export function getRandomPassword() {
  const names = ['test', 'password', 'пароль', '123456', '1q2w3e4r', '111111', '654321']
  return getRandomValue(names)
}

export function getRandomDescription() {
  const names = ['test', 'description', 'описание', 'мой аккаунт', 'аккаунт от гугла', 'не забыть поменять пароль']
  return getRandomValue(names)
}

export function getRandomCreateDate() {
  const days = getRandomNumber(100, -100)

  const currentDate = new Date()
  currentDate.setDate(currentDate.getDate() + days);
  return currentDate.toISOString()
}

export function getRandomIsDeleted() {
  return Boolean(getRandomNumber(2))
}

export type Item = {
  id: number | string;
  createdDate: string;
  name: string;
  address: string;
  login: string;
  password: string;
  editCount: number;
  description: string;
  isDeleted: boolean
}

export function getDataItem(index: number): Item {
  return {
    id: index,
    createdDate: getRandomCreateDate(),
    name: getRandomName(),
    address: getRandomAddress(),
    login: getRandomLogin(),
    password: getRandomPassword(),
    editCount: getRandomNumber(100),
    description: getRandomDescription(),
    isDeleted: getRandomIsDeleted()
  }
}

export function getDataFormTable(count = 100) {
  return Array.from(Array(count).keys()).map((item, index) => getDataItem(index))
}