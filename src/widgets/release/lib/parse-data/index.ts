type ParsedDataValue = string | { value?: string; get_params?: string }

const parseValue = (item: ParsedDataValue): string => {
  if (typeof item === 'string') {
    return item
  }
  if (item && typeof item === 'object') {
    return item.value || 'Невідомо'
  }
  return 'Невідомо'
}
