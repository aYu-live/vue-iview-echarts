import XLSX from 'xlsx'
export const export_array_to_excel=({title,key,data,autoWidth,fileName}) => {
  const wb=XLSX.utils.book_new()//创建一个新的工作表
  const arr=json_to_array(key,data)
  arr.unshift(title)
  const ws=XLSX.utils.aoa_to_sheet(arr)//将JS数据数组的数组转换为工作表
  if(autoWidth){
    auto_width(ws, arr)
  }
  XLSX.utils.book_append_sheet(wb,ws,fileName)
  XLSX.writeFile(wb, fileName + '.xlsx')
}

export const read =(data,type)=> {
  //解读data数据
  const workbook =XLSX.read(data,{type:type})
  //创建解读完毕的的有序列表,SheetName是文件名，第一行就是文件名
  const firstSheetName = workbook.SheetNames[0]
  //workbook.Sheets的firstSheetName这一行的属性，属性是表格内容
  const worksheet = workbook.Sheets[firstSheetName]
  //获得每一列的字段名：键名
  const header = get_header_row(worksheet)
  //获取表格表体内容
  const results = XLSX.utils.sheet_to_json(worksheet)
  return{header,results}
}

function json_to_array(key,jsonData) {
  return jsonData.map(item => key.map(index => {return item[index]}))
}

function auto_width(ws, data){
  //遍历表格里面的数据
  const colWidth = data.map(row => row.map(val => {
    //如果存在数值为空，则该列长度为10
    if(val == null){
      return {'wch':10}
    }
    //汉字字节为2
    else if(val.toString().charCodeAt(0)>255){
      return {'wch': val.toString().length * 2}
    }else{
      return {'wch':val.toString().length}
    }
  }))
  //从第一行表头开始
  //表头的每一列的宽度
  let result = colWidth[0]
  console.log(colWidth);
  //遍历列  colWidth[i]为每一行的对象[{wch: 1},{wch: 1},{wch: 1}]
  //colWidth.length为行数（包括表头表体）
  for(let i = 1; i<colWidth.length; i++){
    //一行有里面的数据是表体的宽度[{wch: 1},{wch: 1},{wch: 1}]
    for(let j = 0;j < colWidth[i].length;j++){
      //如果表头其中某一列的宽度小于表体某一列的宽的
      if(result[j]['wch'] < colWidth[i][j]['wch']){
        result[j]['wch'] = colWidth[i][j]['wch']
      }
    }
  }
  ws['!cols']=result
  console.log('result',result);
}

function get_header_row(worksheet){
  const headers=[]
  //转成细胞范围
  const range = XLSX.utils.decode_range(worksheet['!ref'])
  let C;
  const R = range.s.r
  // 遍历整个范围
  for(C=range.s.c; C <= range.e.c; ++C){
    var cell = worksheet[XLSX.utils.encode_cell({c:C, r:R})]
    var hdr='unknown'+C
    if(cell && cell.t){
      hdr=XLSX.utils.format_cell(cell)
    }
    headers.push(hdr)
  }
  return headers
}

export default {
  export_array_to_excel,
  read
}