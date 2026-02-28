import * as ecs from '@8thwall/ecs'

// 注册 Audio 和 Business Card 动画的功能
ecs.registerComponent({
  name: 'Animations',
  schema: {
    model: ecs.eid,  // 业务卡片的 3D 模型
  },

  stateMachine: ({world, eid, schemaAttribute}) => {
    ecs.defineState('default')
      .initial()
      .listen(world.events.globalId, 'reality.imagefound', () => {  // 每次图像识别时都触发
        const {model} = schemaAttribute.get(eid)

        // 处理业务卡片模型动画
        if (model) {
          console.log('Model Entity:', model)  // 调试输出模型实体
          ecs.Hidden.remove(world, model)  // 显示模型
          ecs.ScaleAnimation.set(world, model, {
            fromX: 0.25,
            fromY: 0.25,
            fromZ: 0.25,
            toX: 0.5,
            toY: 0.5,
            toZ: 0.5,
            loop: false,
            easeOut: true,
            easingFunction: 'Elastic',
            duration: 2400,  // 动画持续时间
          })
        }
      })
  },
})
