import * as ecs from '@8thwall/ecs'

// 注册 Audio Playback 组件
ecs.registerComponent({
  name: 'Audio Playback',
  schema: {
    audioEntity: ecs.eid,  // 音频实体的 eid
  },

  stateMachine: ({world, eid, schemaAttribute}) => {
    ecs.defineState('default')
      .initial()
      .listen(world.events.globalId, 'reality.imagefound', () => {
        const {audioEntity} = schemaAttribute.get(eid)

        if (audioEntity) {
          console.log('Image found, starting audio playback')

          // 使用 ECS 提供的方式播放音频
          ecs.Audio.mutate(world, audioEntity, (cursor) => {
            cursor.paused = false  // 播放音频
          })
        } else {
          console.warn('No audioEntity found for Audio Playback')
        }
      })
  },
})
