type ENV = 'daily' | 'product'

type ENV_PATH = {
  [K in ENV]: string
}
