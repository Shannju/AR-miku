import * as ecs from '@8thwall/ecs'

ecs.registerComponent({
  name: 'Click To Hide Self',

  stateMachine: ({world, eid}) => {
    ecs.defineState('default')
      .initial()
      .listen(eid, ecs.input.UI_CLICK, () => {
        console.log('[ClickToHideSelf] UI_CLICK detected')

        // 播放静音音频（解锁音频上下文）
        const audio = new Audio()
        audio.src = 'data:audio/mp3;base64,//uQxAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAACcQCAAMEBQAAACAAADSAAAAABJRU5ErkJggg=='
        audio.volume = 0
        audio.play()
          .then(() => {
            console.log('[ClickToHideSelf] Silent audio played — audio context unlocked')
          })
          .catch((err) => {
            console.warn('[ClickToHideSelf] Failed to play silent audio:', err)
          })

        // 隐藏自己
        ecs.Hidden.set(world, eid)
      })
  },
})
