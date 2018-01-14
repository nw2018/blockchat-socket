exports.isInRange=(center,location,radius)=>{
  let x = Math.abs(center.lat-location.lat),
    y = Math.abs(center.lng-location.lng);
  return Math.sqrt(x^2+y^2)<radius;
}