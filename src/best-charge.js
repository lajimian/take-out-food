
var loadPromotions = require('../src/promotions.js');
var loadAllItems = require('../src/items.js');

function bestCharge(selectedItems) {
  var item=loadAllItems();
  var promotion=loadPromotions();
  var receipt="============= 订餐明细 ============="+'\n';
  var summary=0;
  var count=[];
  var items=[];

  for(var i=0;i<selectedItems.length;i++)
  {
    count.push(selectedItems[i].slice(11,selectedItems[i].length));
    items.push(selectedItems[i].slice(0,8));
  }   //将selectedItems转化成count和items

  for(var i=0;i<selectedItems.length;i++)
    for(var j=0;j<item.length;j++)
    {
      if(items[i]==item[j].id)
      {
        summary+=item[j].price*count[i];
        receipt+=item[j].name+' x '+count[i]+' = '+item[j].price*count[i]+'元'+'\n';
      }
    }    //将count和items转化成订单
  

  receipt+='-----------------------------------'+'\n';

  var banjia_summary=summary;
  var flag=0;

  for(var i=0;i<selectedItems.length;i++) {
    if (items[i]==promotion[1].items[0])
    {
      banjia_summary -=9*count[i] ;
      flag=1;
    }

    if (items[i]==promotion[1].items[1])
    {
      banjia_summary -= 4*count[i];
      flag=1;
    }
  }  //计算半价优惠价格

  if(summary>=30)
    var manjian_summary=summary-6;
  // 计算满减价格

  if(flag==0&&summary<30)
    receipt+='总计：'+summary+'元'+'\n'+'===================================';

  else if(banjia_summary<=manjian_summary)
    receipt+='使用优惠:'+'\n'+promotion[1].type+'(黄焖鸡，凉皮)，省'+`${summary-banjia_summary}`+'元'+'\n'+'-----------------------------------'+'\n'+'总计：'+banjia_summary+'元'+
      '\n'+'===================================';
  else
    receipt+='使用优惠:'+'\n'+promotion[0].type+'，省'+`${summary-manjian_summary}`+'元'+'\n'+'-----------------------------------'+'\n'+'总计：'+manjian_summary+'元'+
      '\n'+'===================================';
  //判断使用什么优惠，并转化成订单明细receipt


  return receipt;  // 输出订单明细receipt
}

module.exports = bestCharge;
