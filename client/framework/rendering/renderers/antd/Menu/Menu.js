import React from 'react';
import {
    Menu,
    Icon
}
from 'antd';
const {
    SubMenu
} = Menu;
import componentRegistry from 'framework/rendering/componentRegistry';
import './styles.scss';

class AntDMenu extends React.Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            openKeys: [],
            inlineOpenKeys: []
        };
    }
    
    componentWillReceiveProps(nextProps) {
        if (this.props.mode == "inline" && nextProps.mode == "vertical") {
            this.setState({
                openKeys: []
            });
        }
        
        if (this.props.mode == "vertical" && nextProps.mode == "inline") {
            this.setState({
                openKeys: this.state.inlineOpenKeys
            });
        }
    }
    
    createGroupedMenu (mode, options) {
        
        let groups = options.groups;
        let groupCount = groups.length;
        let groupElements = [];
        let openKeys = [];
    
        for(let groupIndex = 0; groupIndex < groupCount; groupIndex++) {
            
            let group = groups[groupIndex];
            let groupKey = `group_${groupIndex}`;
            
            if (group.isOpen) {
                openKeys.push(groupKey);
            }
            
            let subMenuItemElements = this.getMenuItems(group.items, groupIndex);
            let groupElement = (
                <SubMenu
                    key={groupKey}
                    title={
                        <span>
                            <Icon type={group.icon} />
                            <span className="nav-text">{group.heading}</span>
                        </span>
                    }>
                    
                    { subMenuItemElements }
                    
                </SubMenu>
            );
            
            groupElements.push(groupElement);
        }
        
        return (
            <Menu {...options} mode={mode} collapsible={true} defaultOpenKeys={openKeys} openKeys={this.state.openKeys} onOpenChange={this.onOpen.bind(this)}>
                {groupElements}
            </Menu>
        );
    }
    
    onOpen(keys) {
        this.setState({
            openKeys: keys,
            inlineOpenKeys: keys
        });
    }
    
    createMenu (options) {
      let items = options.items;
      let itemElements = this.getMenuItems(items, 1);
      
      return (
            <Menu {...options}>
                    {itemElements}
            </Menu>
        );
    };

    getMenuItems (items, groupIndex) {
        let itemElements = [];
        let itemCount = items.length;
        
        for(let itemIndex = 0; itemIndex < itemCount; itemIndex++) {
            
            let item = items[itemIndex];
            let ChildComponent = componentRegistry.get(item.type);
            let itemElement = (
                <Menu.Item key={`item_${groupIndex}_${itemIndex}`}>
                    <ChildComponent options={item.options}>
                        {item.options.text}
                    </ChildComponent>
                </Menu.Item>
            );
            
            itemElements.push(itemElement);
        }
        
        return itemElements;
    }
    
    render () {
        let hasGroups = this.props.options.groups != undefined;
        
        if (hasGroups) {
            return this.createGroupedMenu(this.props.mode, this.props.options);
        }
        
        return this.createMenu(this.props.options);
    }
}

export default AntDMenu;