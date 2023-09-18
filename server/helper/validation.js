function hasEmptyStringValues(obj) {
  return Object.keys(obj).some((key) => obj[key] === "");
}

module.exports = { hasEmptyStringValues };
