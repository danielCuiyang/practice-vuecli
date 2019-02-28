<template>
    <div>
       <Headers @searchContent="getSearchContent"></Headers>
       <div class="navlist">
          <ul>
            <li class="active">全部</li>
            <li>注册中</li>
            <li>已注册</li>
            <li>满三年</li>
            <li>将到期</li>
            <li>已到期</li>
          </ul>
       </div>
       <scroller :on-infinite="infinite" style="top:2.1rem"  snappingHeight="60" ref="my_scroller" >
         <ul class="trademarkList">
           <li>
              <div class="trademarkImg">
                <img src="http://pic.86sb.com/uploads/Brand_sb/2680307633.jpg?11&x-oss-process=image/resize,w_410,h_310" alt="">
              </div>
              <div class="reademarkMessage">
                 <h3>秘束</h3>
                 <p><span>商标类别：25</span><span class="number">注册号：25234567</span></p>
                 <p>申请人：上海尚标互联网科技有限公司 </p>
                 <p>商标状态：商标注册完成 </p>
              </div>
           </li>
           <li>
             <div class="trademarkImg">
               <img src="http://pic.86sb.com/uploads/Brand_sb/2680307633.jpg?11&x-oss-process=image/resize,w_410,h_310" alt="">
             </div>
             <div class="reademarkMessage">
               <h3>秘束</h3>
               <p><span>商标类别：25</span><span class="number">注册号：25234567</span></p>
               <p>申请人：上海尚标互联网科技有限公司 </p>
               <p>商标状态：商标注册完成 </p>
             </div>
           </li>
           <li>
             <div class="trademarkImg">
               <img src="http://pic.86sb.com/uploads/Brand_sb/2680307633.jpg?11&x-oss-process=image/resize,w_410,h_310" alt="">
             </div>
             <div class="reademarkMessage">
               <h3>秘束</h3>
               <p><span>商标类别：25</span><span class="number">注册号：25234567</span></p>
               <p>申请人：上海尚标互联网科技有限公司 </p>
               <p>商标状态：商标注册完成 </p>
             </div>
           </li>
           <li>
             <div class="trademarkImg">
               <img src="http://pic.86sb.com/uploads/Brand_sb/2680307633.jpg?11&x-oss-process=image/resize,w_410,h_310" alt="">
             </div>
             <div class="reademarkMessage">
               <h3>秘束</h3>
               <p><span>商标类别：25</span><span class="number">注册号：25234567</span></p>
               <p>申请人：上海尚标互联网科技有限公司 </p>
               <p>商标状态：商标注册完成 </p>
             </div>
           </li>
           <li>
             <div class="trademarkImg">
               <img src="http://pic.86sb.com/uploads/Brand_sb/2680307633.jpg?11&x-oss-process=image/resize,w_410,h_310" alt="">
             </div>
             <div class="reademarkMessage">
               <h3>秘束</h3>
               <p><span>商标类别：25</span><span class="number">注册号：25234567</span></p>
               <p>申请人：上海尚标互联网科技有限公司 </p>
               <p>商标状态：商标注册完成 </p>
             </div>
           </li>
           <li>
             <div class="trademarkImg">
               <img src="http://pic.86sb.com/uploads/Brand_sb/2680307633.jpg?11&x-oss-process=image/resize,w_410,h_310" alt="">
             </div>
             <div class="reademarkMessage">
               <h3>秘束</h3>
               <p><span>商标类别：25</span><span class="number">注册号：25234567</span></p>
               <p>申请人：上海尚标互联网科技有限公司 </p>
               <p>商标状态：商标注册完成 </p>
             </div>
           </li>
           <li>
             <div class="trademarkImg">
               <img src="http://pic.86sb.com/uploads/Brand_sb/2680307633.jpg?11&x-oss-process=image/resize,w_410,h_310" alt="">
             </div>
             <div class="reademarkMessage">
               <h3>秘束</h3>
               <p><span>商标类别：25</span><span class="number">注册号：25234567</span></p>
               <p>申请人：上海尚标互联网科技有限公司 </p>
               <p>商标状态：商标注册完成 </p>
             </div>
           </li>
         </ul>
       </scroller>
    </div>
</template>


<script>
   import Headers from '@/components/Header'
    export default {
      methods: {
        infinite() {
          console.log("下拉");
        },
        getSearchContent(){

        }
      },
      components:{
        Headers
      },
    }
</script>

<style lang="scss" scoped>
  @import "../../style/trademarkList.scss";

</style>
