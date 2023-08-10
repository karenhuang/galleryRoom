const express = require('express')
const router = express.Router()
let response
router.use(function (req, res, next) {
  response = {
    status: 'Fail',
    data: null,
    message: null
  }
  next()
})

router.route('/logo')
  .get(function (req, res, next) {
    response.status = 'Success'
    response.data = {
      vue: {
        title: 'The Progressive <br> JavaScript Framework',
        link: [{
          content: 'GET STARTED',
          href: 'https://vuejs.org/v2/guide/',
          type: 0,
          target: '_blank'
        }, {
          content: 'GITHUB',
          href: 'https://github.com/vuejs/vue',
          type: 1,
          target: '_blank'
        }]
      }
    }
    response.message = null
    res.json(response)
  })
router.route('/list')
  .get(function (req, res, next) {
    response.status = 'Success'
    response.data = {
      list: [{
        title: 'Approachable',
        description: 'Already know HTML, CSS and JavaScript? Read the guide and start building things in no time!'
      }, {
        title: 'Versatile',
        description: 'Simple, minimal core with an incrementally adoptable stack that can handle apps of any scale.'
      }, {
        title: 'Performant',
        description: '19kb min+gzip Runtime <br> Blazing Fast Virtual DOM <br> Minimal Optimization Efforts.'
      }]
    }
    response.message = null
    res.json(response)
  })



router.route('/gallery')
  .get(function (req, res, next) {
    response.status = 'Success'
    response.data = {
      data: {
        pictures: [{
          "id": "activity:item:21427",
          "width": 850,
          "height": 525,
          "description": "早烏享折扣",
          "title": "阿里山火車.包列上行導覽列車.阿里山森林樂園.觀日出.雲海.森林巨木步道二日",
          "author": "台中出發",
          "path": "http://localhost:8080/images/M_PIC2005-015245.jpg"
        },{
          "id": "activity:item:21428",
          "width": 850,
          "height": 567,
          "description": "台中旅遊",
          "title": "新社薰衣草紫丘幸福體驗.大雪山－雪山神木、天池、夜間生態體驗2日",
          "author": "台中出發",
          "path": "http://localhost:8080/images/M_PIC2104-028393.jpg"
        },{
          "id": "activity:item:21427",
          "width": 224,
          "height": 150,
          "description": "冰島極光",
          "title": "│藍湖溫泉,冰河健行,夢幻冰河湖.金環之旅,黑沙灘,巴黎小旅行10日",
          "author": "",
          "path": "http://localhost:8080/images/M_PIC1602-005428.jpg"
        },{
          "id": "activity:item:21428",
          "width": 850,
          "height": 567,
          "description": "",
          "title": "西爾加蘭第瀑布與史考克瀑布",
          "author": "",
          "path": "http://localhost:8080/images/view01.jpg"
        },{
          "id": "activity:item:21427",
          "width": 960,
          "height": 672,
          "description": "",
          "title": "金環之旅｜間歇泉",
          "author": "",
          "path": "http://localhost:8080/images/view02.jpg"
        },{
          "id": "activity:item:21428",
          "width": 960,
          "height": 672,
          "description": "",
          "title": "玄武峭壁黑沙灘",
          "author": "",
          "path": "http://localhost:8080/images/view03.jpg"
        },{
          "id": "activity:item:21427",
          "width": 960,
          "height": 672,
          "description": "",
          "title": "金環之旅｜黃金瀑布",
          "author": "",
          "path": "http://localhost:8080/images/view04.jpg"
        },{
          "id": "activity:item:21428",
          "width": 362,
          "height": 242,
          "description": "台中旅遊",
          "title": "新社薰衣草紫丘幸福體驗.大雪山－雪山神木、天池、夜間生態體驗2日",
          "author": "台中出發",
          "path": "http://localhost:8080/images/M_PIC2104-028393.jpg"
        },{
          "id": "activity:item:21427",
          "width": 391,
          "height": 242,
          "description": "早烏享折扣",
          "title": "阿里山火車.包列上行導覽列車.阿里山森林樂園.觀日出.雲海.森林巨木步道二日",
          "author": "台中出發",
          "path": "http://localhost:8080/images/M_PIC2005-015245.jpg"
        },{
          "id": "activity:item:21428",
          "width": 362,
          "height": 242,
          "description": "台中旅遊",
          "title": "新社薰衣草紫丘幸福體驗.大雪山－雪山神木、天池、夜間生態體驗2日",
          "author": "台中出發",
          "path": "http://localhost:8080/images/M_PIC2104-028393.jpg"
        },{
          "id": "activity:item:21427",
          "width": 391,
          "height": 242,
          "description": "早烏享折扣",
          "title": "阿里山火車.包列上行導覽列車.阿里山森林樂園.觀日出.雲海.森林巨木步道二日",
          "author": "台中出發",
          "path": "http://localhost:8080/images/M_PIC2005-015245.jpg"
        }]
      }
    }
    response.message = null
    res.json(response)
  })


router.use(function (req, res) {
  response.message = "API NOT MATCH"
  res.json(response)
})
router.route('/GalleryRoom')
  .get(function (req, res, next) {
    response.status = 'Success'
    response.data = {
      data: 'GalleryRoom\'s Data!!!'
    }
    response.message = null
    res.json(response)
  })


module.exports = router