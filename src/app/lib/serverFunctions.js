export const setCustomHeader=(res,headers)=>{
  Object.entries(headers).forEach(([name, value]) => {
    res.headers.set(name, value);
  });
  return res
}

export const cacheHeader=()=>{
  return {
    'Cache-Control': 'max-age=60',
  };
}