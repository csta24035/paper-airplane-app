export function validateName(
  name: string
): string | null {

  if (name.trim().length < 1) {
    return "名前は必須です";
  }

  if (name.length > 100) {
    return "名前は100文字以内です";
  }

  return null;
}
export function validateDistance(
  distance: string
): string |null{

  if(distance===""){
    return null;
  }

  const value=Number(distance);

  if(Number.isNaN(value)){
    return "飛距離は数値です";
  }

  if(value<0.1||value>9999.9){
    return "飛距離は0.1〜9999.9m";
  }

  return null;
}
export function validateFoldCount(
  foldCount:string
):string|null{

  if(foldCount===""){
    return null;
  }

  const value=Number(foldCount);

  if(!Number.isInteger(value)){
    return "折る回数は整数";
  }

  if(value<0||value>999){
    return "折る回数は0〜999";
  }

  return null;
}
export function validateMemo(
  memo:string
):string|null{

  if(memo.length>256){
    return "備考は256文字以内";
  }

  return null;
}