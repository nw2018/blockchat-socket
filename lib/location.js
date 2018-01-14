exports.isInRange=(center,location,radius)=>{
  let x = Math.abs(center.lat-location.lat),
    y = Math.abs(center.lng-location.lng);
  //console.log(Math.sqrt(x*x+y*y));
  return Math.sqrt(x*x+y*y)<radius;
}