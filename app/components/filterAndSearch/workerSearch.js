onmessage = msg => {
  const usedFilters = [
    {filter: 'gender', set: new Set()},
    {filter: 'color', set: new Set()},
    {filter: 'is_sterile', set: new Set()},
    {filter: 'hair', set: new Set()},
    {filter: 'type', set: new Set()},
    {filter: 'water_type', set: new Set()},
    {filter: 'temper', set: new Set()},
    {filter: 'activity', set: new Set()},
  ];

  msg.data.forEach(product => {
    usedFilters.forEach(filterObj => {
      if (filterObj.filter === 'color') {
        product[filterObj.filter].split('-')
          .forEach(color => filterObj.set.add(color));
      } else if (product[filterObj.filter]) {
        filterObj.set.add(String(product[filterObj.filter]));
      }
    })
  });

  let maxPrice = msg.data.reduce((maxPrice, product) => maxPrice > product.price ? maxPrice : product.price, 0);
  maxPrice = Math.ceil(maxPrice);

  postMessage({
    arr: usedFilters.filter(item => item.set.size !== 0),
    maxPrice,
  });
};