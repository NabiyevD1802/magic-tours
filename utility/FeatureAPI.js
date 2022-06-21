class FeatureAPI {
  constructor(clientQuery, databaseQuery) {
    this.clientQuery = clientQuery;
    this.databaseQuery = databaseQuery;
  }

  filter() {
    const queryObj = { ...this.clientQuery };
    const clientQuerys = ['field', 'sort', 'page', 'limit'];

    clientQuerys.forEach((val) => {
      delete queryObj[val];
    });
    let queryC = JSON.stringify(queryObj);
    queryC = queryC.replace(/\bgt|gte|lt|lte\b/g, (val) => `$${val}`);

    let queryData = JSON.parse(queryC);

    this.databaseQuery = this.databaseQuery.find(queryData);
    return this;
  }
  sorting() {
    if (this.clientQuery.sort) {
      let sortData = this.clientQuery.sort.split(',').join(' ');
      this.databaseQuery = this.databaseQuery.sort(sortData);
    } else {
      this.databaseQuery = this.databaseQuery.sort('-createdAt');
    }
    return this;
  }
  field() {
    if (this.clientQuery.field) {
      let fieldData = this.clientQuery.field.split(',').join(' ');
      this.databaseQuery = this.databaseQuery.select(fieldData);
    } else {
      this.databaseQuery = this.databaseQuery.select('-__v');
    }
    return this;
  }
  pagenation() {
    const page = this.clientQuery.page * 1 || 1;
    const limit = this.clientQuery.limit * 1 || 3;
    this.databaseQuery = this.databaseQuery
      .skip((page - 1) * limit)
      .limit(limit);
    return this;
  }
}

module.exports = FeatureAPI;
