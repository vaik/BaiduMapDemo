/**
 * Created by Vaik on 2016/4/26.
 */
var map = new BMap.Map("showDemo"),
    point = new BMap.Point(113.959005, 22.539265);
//marker = new BMap.Marker(point);
map.centerAndZoom(point, 16);
map.enableScrollWheelZoom();

//var map1 = new BMap.Map("showDemo1"),
//    point1 = new BMap.Point(113.959005, 22.539265);
////marker = new BMap.Marker(point);
//map1.centerAndZoom(point1, 16);
//map1.enableScrollWheelZoom();

var mapType = map.getMapType();
var projection = mapType.getProjection();

var polygon = new BMap.Polygon();
polygon.setStrokeColor("#6B8BAD");
polygon.setFillColor("#FBFBFC");
polygon.setStrokeWeight(2);
polygon.enableEditing();
polygon.setStrokeOpacity(0.9);

var circle = new BMap.Circle(point, 1000);
circle.setStrokeColor("red");
circle.setStrokeStyle("dashed");
circle.setStrokeWeight(2);
map.addOverlay(circle);

var points = [];
map.addEventListener("click", function (e) {
    console.log(e.point.lng + ',' + e.point.lat);
    var newPoint = new BMap.Point(e.point.lng, e.point.lat);
    if (BMapLib.GeoUtils.isPointInCircle(newPoint, circle)) {
        points.push(newPoint);
        if(points.length > 3) {
            points = getProjectionPoints(points);
        }
        polygon.setPath(points);
        map.addOverlay(polygon);
    } else {
        console.log('坐标：' + e.point.lng + ',' + e.point.lat + '不在圆内！');
    }
});

function getProjectionPoints(points) {
    var projectionPoints = [];
    for (var i = 0, len = points.length; i < len; i++) {
        projectionPoints.push(projection.lngLatToPoint(points[i]));
    }
    var projectionFirstPoint = projectionPoints[0];
    var A = [];
    var B = [];
    var C = [];
    var D = [];
    for (var n = 0, len1 = projectionPoints.length; n < len1; n++) {
        var item = {
            index: n,
            x: projectionPoints[n].x - projectionFirstPoint.x,
            y: projectionPoints[n].y - projectionFirstPoint.y
        };
        if (n > 0) {
            if (item.x >= 0 && item.y >= 0) {
                A.push(item)
            } else if (item.x > 0 && item.y < 0) {
                B.push(item);
            } else if (item.x <= 0 && item.y <= 0) {
                C.push(item);
            } else {
                D.push(item);
            }
        }
    }
    if (A.length > 0) {
        sortProjectionPoints("desc", A);
    }
    if (B.length > 0) {
        sortProjectionPoints("desc", B);
    }
    if (C.length > 0) {
        sortProjectionPoints("desc", C);
    }
    if (D.length > 0) {
        sortProjectionPoints("desc", D);
    }
    var resultProjectionPoints = A.concat(B, C, D);
    var result = [];
    result.push(points[0]);
    for (var num = 0, theLen = resultProjectionPoints.length; num < theLen; num++) {
        result.push(points[resultProjectionPoints[num].index]);
    }
    return result;
}

function sortProjectionPoints(action, arryProjectionPoints) {
    var len = arryProjectionPoints.length;
    switch (action) {
        case "desc":
            for (var i = 0; i < len - 1; i++) {
                for (var j = i + 1; j < len; j++) {
                    if(arryProjectionPoints[j].x !=0 && arryProjectionPoints[i].x !=0) {
                        if ((arryProjectionPoints[j].y / arryProjectionPoints[j].x) > (arryProjectionPoints[i].y / arryProjectionPoints[i].x)) {
                            var temp = arryProjectionPoints[j];
                            arryProjectionPoints[j] = arryProjectionPoints[i];
                            arryProjectionPoints[i] = temp;
                        }
                    }else{
                       if(arryProjectionPoints[j].x ==0) {
                           var temp = arryProjectionPoints[j];
                           arryProjectionPoints[j] = arryProjectionPoints[i];
                           arryProjectionPoints[i] = temp;
                       }
                    }
                }
            }
            break;
        case "asc":
            for (var i = 0; i < len - 1; i++) {
                for (var j = i + 1; j < len; j++) {
                    if(arryProjectionPoints[j].x !=0 && arryProjectionPoints[i].x !=0) {
                        if ((arryProjectionPoints[j].y/arryProjectionPoints[j].x) < (arryProjectionPoints[i].y /arryProjectionPoints[i].x)) {
                            var temp = arryProjectionPoints[j];
                            arryProjectionPoints[j] = arryProjectionPoints[i];
                            arryProjectionPoints[i] = temp;
                        }
                    }else{
                        if(arryProjectionPoints[i].x ==0) {
                            var temp = arryProjectionPoints[j];
                            arryProjectionPoints[j] = arryProjectionPoints[i];
                            arryProjectionPoints[i] = temp;
                        }
                    }
                }
            }
            break;
    }
}

function getInsertPointsIndex(newPoint, points) {
    return lastIndex;
}
///*
//
//* points：点数组
//* hourhand：Number 1 顺时针，2 逆时针 默认1
// */
//function SortPointByCircle(points,hourhand){
//
//}
//
//
map.addEventListener("rightclick", function (e) {
    points.pop();
    polygon.setPath(points);
    map.addOverlay(polygon);

});
//map.addOverlay(marker);
//marker.setAnimation(BMAP_ANIMATION_BOUNCE);

//var content = '<div class="main_right">'+
//    '<div class="main_context">'+
//'<p style="text-align:center">' +
//'<img src="http://w2admin.paidui.com/Content/Images/PDW/20151106/6358240425027918707635299.jpg" title="culture.jpg" alt="culture.jpg">' +
//'</p>' +
//'<p style="white-space: normal; text-indent: 32px; line-height: 1.75em; text-align: left;">' +
//'<strong><span style="font-family: 微软雅黑, sans-serif;">深圳排队网络技术有限公司</span></strong>' +
//'<span style="font-family: 微软雅黑, sans-serif;">（简称排队网），是国内首屈一指的在线餐饮软件开发及服务提供商。成立于</span>' +
//'<span style="font-family: 微软雅黑, sans-serif;">2011</span>' +
//'<span style="font-family: 微软雅黑, sans-serif;">年，专注于移动互联网餐饮行业，致力于为消费者提供完整的一站式餐饮服务，为商家提供精准的营销以及现代化智能餐饮管理。</span>' +
//'</p>' +
//'<p style="white-space: normal; text-indent: 32px; line-height: 1.75em; text-align: left;">' +
//'<span style="font-family: \'MS Gothic\';"></span>' +
//'<span style="font-family: 微软雅黑, sans-serif;">排队网锐意创新，在餐饮管理系统及营销服务上取得了卓越成效。聚食汇·智慧云在线点餐、票券、会员、支付等功能迎合了餐饮</span><span style="font-family: 微软雅黑, sans-serif;">O2O</span><span style="font-family: 微软雅黑, sans-serif;">发展步伐；根据消费行为实现云端数据分析，定位用户就餐习惯，实现精准营销，帮助企业实现低成本扩张，提高营业额，创造更大的价值。</span></p><p style="white-space: normal; text-indent: 32px; line-height: 1.75em; text-align: left;"><span style="font-family: 微软雅黑, sans-serif;"><br></span></p><p style="white-space: normal; text-indent: 32px; line-height: 1.75em; text-align: left;"><span style="font-family: 微软雅黑, sans-serif;"></span><span style="line-height: 1.5em; font-family: 微软雅黑, sans-serif;"></span><span style="line-height: 1.5em; font-family: 微软雅黑, sans-serif;"></span><span style="line-height: 1.5em; font-family: 微软雅黑, sans-serif;">排队网凭借雄厚技术实力、成熟的产品体系、服务体系和强大的网络营销体系，在全国建立了</span><span style="line-height: 1.5em; font-family: 微软雅黑, sans-serif;">500</span><span style="line-height: 1.5em; font-family: 微软雅黑, sans-serif;">多家合作伙伴服务机构，与10000多家商户达成良好的合作关系。未来，排队网将继续秉承“为消费者汇聚天下美食，为餐饮商家提供精准营销”的使命，诚信拼搏，携手广大合作伙伴，共同掘金餐饮O2O蓝海。</span></p>'+
//    '</div>'+
//    '</div>';
//
////创建检索信息窗口对象
//var searchInfoWindow = null;
//searchInfoWindow = new BMapLib.SearchInfoWindow(map, content, {
//    title  : "深圳排队网",      //标题
//    width  : 800,             //宽度
//    height : 400,              //高度
//    panel  : "panel",         //检索结果面板
//    enableAutoPan : true,     //自动平移
//    searchTypes   :[
//        BMAPLIB_TAB_SEARCH,   //周边检索
//        BMAPLIB_TAB_TO_HERE,  //到这里去
//        BMAPLIB_TAB_FROM_HERE //从这里出发
//    ]
//});
//var marker = new BMap.Marker(point); //创建marker对象
//marker.enableDragging(); //marker可拖拽
//marker.addEventListener("click", function(e){
//    searchInfoWindow.open(marker);
//})
//map.addOverlay(marker); //在地图中添加marker
//





