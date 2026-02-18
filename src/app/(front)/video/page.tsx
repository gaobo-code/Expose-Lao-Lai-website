export default function Video() {
  return (
    <div className="w-screen bg-thirdbackground flex flex-col items-center">
      <section className="w-full xl:w-320 flex flex-col items-center py-4 px-4 box-border tracking-wider h-[calc(100svh-var(--spacing)*14)] b:h-[calc(100svh-var(--spacing)*17)] xl:h-[calc(100svh-var(--spacing)*33)] overflow-hidden">
        <div className="w-full h-full flex flex-row justify-around items-center">
          <video
            className="rounded-xl xl:shadow-lg max-h-full w-[500px] h-[882px]"
            width={500}
            height={882}
            // src="/mata.mp4"
            poster="/mata-placeholder.webp"
            controls
            autoPlay
            muted
            loop
            playsInline

          >
            <source src="/mata.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="text-[0] leading-[2.2] pl-12 box-border line-clamp-20 hidden xl:block justify-cjk">
            <span className="text-xl">
              软件开发行业，因有这类人为耻。现代的人啊，良心都让狗吃了，一天天的净干这没屁眼的事。
            </span>
            <span className="text-xl">
              事情是这样的，我们上个月呢，接了两个项目，是同行介绍的，客户是辽宁的，大家都知道，现在很多软件公司会把项目转包出去，
            </span>
            <span className="text-xl">
              我们有些项目，也是别的公司转包给我们的。辽宁志在远方网络科技有限公司，我们给他们做两个项目，一个是出行类APP，一个是
            </span>
            <span className="text-xl">
              加速器APP。项目前期，从需求到思维导图都非常混乱，本着把事做好的态度，我们需求在前期都整理了好几天。然后进入了开发阶段，
            </span>
            <span className="text-xl">
              在沟通的过程中，对方也特别不耐烦，这个也能理解，谁叫我们是乙方呢。既然项目接了，我们肯定是想方设法把项目做完，后面的事呢，
            </span>
            <span className="text-xl">
              真是小刀拉屁股开眼了。这个公司呢，其实就1个人，没有办公场地，也没有员工，这样的公司，也不知道咋接到项目的。项目呢，我们按照
            </span>
            <span className="text-xl">
              要求做完了，刚开始还说，你们这个项目做的挺好，很快就能支付尾款了，这个很快呢，我们一等就等了半个多月，再找呢就各种理由不给
            </span>
            <span className="text-xl">
              支付尾款，两个项目，都是欠我们50%的尾款没结算。在后面呢，就是打电话不接，后来我们技术负责人打电话过去，对方就是一顿怼，
            </span>
            <span className="text-xl">
              态度呢还特别恶劣。我这边微信在联系，已经让他删除了。这公司呢，我上网查了一下，法人呢，已经限制高消费了，项目呢，就是法人
            </span>
            <span className="text-xl">
              联系的我们，公司呢失信人，光自身风险呢73条，司法解析20条，还有客户敢找这样的公司做项目？让他们做项目，能安心吗？一撇一捺
            </span>
            <span className="text-xl">
              是为仁义，借之，立足天地，我呢，奉劝你，最起码做个人。这事呢，也不能怪别人，是我自己的问题，多向内归因，也感谢一起陪伴我的
            </span>
            <span className="text-xl">
              兄弟们，一直能鼎立支持我，也希望大家可以多多转发，能让更多的人看到，别再有同行或者朋友受骗了。
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
