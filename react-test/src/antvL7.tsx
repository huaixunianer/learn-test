import { Scene,MarkerLayer,Marker, } from '@antv/l7';
import { DrawCircle,DrawRect,DrawPolygon,DrawEvent } from '@antv/l7-draw';
import { GaodeMapV2 } from '@antv/l7-maps';
import React, { useEffect, useState }  from 'react';

const id = String(Math.random());
const markerLayer = new MarkerLayer();
let scene:any = null
let circle:any = null
let rect:any = null
let polygon:any = null
const Demo: React.FC = () => {
  const [circleDrawer, setCircleDrawer] = useState(null);
  useEffect(() => {
    scene = new Scene({
      id,
      map: new GaodeMapV2({
        center: [120.151634, 30.244831],
        pitch: 0,
        style: 'dark',
        zoom: 10,
      }),
    });
    scene.on('loaded', () => {
    // circle
    circle = new DrawCircle(scene, {
        trigger: 'drag',//绘制方式为拖动
        multiple:false,//禁止绘制多个
        // autoActive:false,
        distanceOptions: {},
      })
      setCircleDrawer(circle);
      circle.enable(false);
      rect = new DrawRect(scene,{
        trigger: 'drag',//绘制方式为拖动
        multiple:false,
        distanceOptions:{}
      })
      rect.enable(false)
      polygon = new DrawPolygon(scene,{
        multiple:false,//禁止绘制多个
      })
      polygon.enable(false)
      // 监听添加Polygon的事件
      circle.on(DrawEvent.Add, (newPolygon, polygonList) => {
        console.log('add', newPolygon, polygonList);
        setMarker(newPolygon)
      });

      // 监听编辑Polygon(拖拽结束)的事件
      circle.on(DrawEvent.Edit, (editPolygon, polygonList) => {
        console.log('edit', editPolygon, polygonList);
      });

      // 监听删除 Polygon 的事件
    //   circle.on(DrawEvent.Remove, (removePolygon, polygonList) => {
    //     console.log('remove', removePolygon, polygonList);
    //   });

      // Polygon数据发生变更时触发，等价于同时监听add和edit事件
      circle.on(DrawEvent.Change, (polygonList) => {
        console.log('change', polygonList);
      });

      // 拖拽开始
      circle.on(DrawEvent.DragStart, (editPolygon, polygonList) => {
        console.log('dragStart', editPolygon, polygonList);
        // circle.clear()
        scene.removeLayer(markerLayer)
      });

      // 拖拽中
    //   circle.on(DrawEvent.Dragging, (editPolygon, polygonList) => {
    //     console.log('dragging', editPolygon, polygonList);
    //   });

      // 拖拽结束
      circle.on(DrawEvent.DragEnd, (editPolygon, polygonList) => {
        console.log('dragEnd', editPolygon, polygonList);
        setMarker(editPolygon)
      });
    });
  }, []);
// set marker
function setMarker(data:any){
    let lng = data.properties.nodes[1].geometry.coordinates[0]
    let lat = data.properties.nodes[1].geometry.coordinates[1]
    // 取消按钮
    let elA = document.createElement("button");
    elA.innerText = '取消'
    elA.className = "cancelbuttonclass";
    // 确认按钮
    let elB = document.createElement("button");
    elB.innerText = '确认'
    elB.className = "ensurebuttonclass";

    let markerA = new Marker({
        element:elA,
    }).setLnglat({ lng: lng, lat: lat });

    let markerB = new Marker({
        element: elB,
    }).setLnglat({ lng: lng, lat: lat });
    markerLayer.addMarker(markerA);
    markerLayer.addMarker(markerB);
    scene.addMarkerLayer(markerLayer);
    //取消当前绘制
    markerA.on("click", (e) => {
        console.log(circle);
        circle?.clear(true)
        scene.removeLayer(markerLayer);
    });
    // 确认当前绘制
    markerB.on('click',(e)=>{
        circle.disable()
        scene.removeLayer(markerLayer);
        setMarkerC(lng,lat)
    })
}
// remove marker
function setMarkerC(lng,lat){
    // 取消按钮
    let elC = document.createElement("button");
    elC.innerText = '取消'
    elC.className = "cancelbuttonclass";
    let markerC = new Marker({
        element:elC,
    }).setLnglat({ lng: lng, lat: lat });
    markerLayer.addMarker(markerC);
    scene.addMarkerLayer(markerLayer);

    //删除当前绘制
    markerC.on("click", (e) => {
        circle?.clear(true)
        scene.removeLayer(markerLayer);
    });
}
  return (
    <div style={{width:'100%'}}>
      <div style={{ padding: 8 }}>
        <button onClick={() => circleDrawer?.disable()}>禁用</button>
        <button onClick={() => circleDrawer?.clear()}>清空</button>
        &nbsp; &nbsp;
        <button onClick={() => circleDrawer?.enable()}>绘制圆形</button>
        <button onClick={() => rect?.enable()}>绘制方形</button>
        <button onClick={() => polygon?.enable()}>绘制面</button>
      </div>
      <div id={id} style={{width:'100%', height: 800, position: 'relative' }} />
    </div>
  );
};

export default Demo;