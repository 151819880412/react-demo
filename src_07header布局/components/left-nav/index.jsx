import React, { Component } from 'react'
import { Link,withRouter } from 'react-router-dom'
import { Menu, Icon } from 'antd'

import logo from '../../assets/images/logo.png'
import './index.less'
import menuList from '../../config/menulonfig'
const { SubMenu } = Menu

/*  
左侧导航组件
*/
 class LeftNav extends Component {


  // getMenuNodes2 = (menuList) => {

  //   // 得到当前请求的path
  //   const path = this.props.location.pathname

  //   return menuList.reduce((pre, item) => {
  //     // 添加<Menu.Item></Menu.Item>
  //     if (!item.children) {
  //       pre.push((
  //         <Menu.Item key={item.key}>
  //           <Link to={item.key}>
  //             <Icon type={item.icon} />
  //             <span>{item.title}</span>
  //           </Link>
  //         </Menu.Item>
  //       ))
  //     } else { // 添加<SubMenu></SubMenu>

  //       // 如果当前请求路由与当前菜单的某个子菜单的key匹配, 将菜单的key保存为openKey
  //       const cItem = item.children.find(cItem => path.indexOf(cItem.key) === 0)
  //       if (cItem) {
  //         this.openKey = item.key
  //       }

  //       pre.push((
  //         <SubMenu
  //           key={item.key}
  //           title={
  //             <span>
  //               <Icon type={item.icon} />
  //               <span>{item.title}</span>
  //             </span>
  //           }
  //         >
  //           {this.getMenuNodes2(item.children)}
  //         </SubMenu>
  //       ))
  //     }
  //     return pre
  //   }, [])
  // }




  getMenuNodes=(menuList)=>{
    
    // 得到当前请求的path
    const path = this.props.location.pathname

    return menuList.map(item => {
      if (!item.children) {
        return (
          <Menu.Item key={item.key}>
            <Link to={item.key}>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
        )
      } else {
        // 如果当前请求路由与当前菜单的某个子菜单的key匹配, 将菜单的key保存为openKey
        if (item.children.find(cItem => path.indexOf(cItem.key) === 0)) {
          this.openKey = item.key
        }
        return (
          <SubMenu
            key={item.key}
            title={
              <span>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </span>
            }
          >
            {this.getMenuNodes(item.children)}
          </SubMenu>
        )
      }
    })
  }

  // 第一次render()之后执行一次
  // 执行异步任务: 发ajax请求, 启动定时器
  
  componentDidMount () {
     this.menuNodes = this.getMenuNodes(menuList)
  }


  // 第一次render()之前执行一次
  // 为第一次render()做一些同步的准备工作
  
  componentWillMount () {
   this.menuNodes = this.getMenuNodes(menuList)
  }


  render() {
    console.log('xxxxx')
    // const menuNodes =this.getMenuNodes(menuList)
    // 得到当前请求路径, 作为选中菜单项的key
    const selectKey = this.props.location.pathname  
    // console.log(selectKey)  //当前的路由
    return (
      <div className="left-nav">
        <Link className="left-nav-link" to="/home">
          <img src={logo} alt="logo"/>
          <h1>硅谷后台</h1>
        </Link>

        <Menu
          defaultSelectedKeys={[selectKey]}
          defaultOpenKeys={[this.openKey]}
          mode="inline"
          theme="dark"
        >
          {
            // this.getMenuNodes(menuList)
           this.menuNodes
          }
        
        </Menu>
      </div>
    )
  }
}
export default withRouter(LeftNav)