(function () {
    var ControlNS = Glodon.Web.Lang.Utility.Namespace.ensureNamespace(Glodon, "Bimface.UI.Control");
    var PanelNS = Glodon.Web.Lang.Utility.Namespace.ensureNamespace(Glodon, "Bimface.UI.Panel");
    var DomNS = Glodon.Web.Lang.Utility.Namespace.ensureNamespace(Glodon, "Web.Lang.Utility.Dom");
    var UtilityNS = Glodon.Web.Lang.Utility.Namespace.ensureNamespace(Glodon, "Web.Lang.Utility");

    var Panel = function Panel(config) {
        ControlNS.Control.call(this, config);
        this._controls = [];
        var self = this;
        var element = self.element;

        self.isShow = true;
        var cantainer = DomNS.create('div', 'bf-cantainer');
        var close = DomNS.create('div', 'bf-close');
        var css = config.css;
        for (var attr in css) {
            element.style[attr] = "" + css[attr];
        }
        if (!config.easyMode) {
            element.appendChild(close);
        }

        if (config.title) {
            var title = DomNS.create('div', 'bf-title');
            title.textContent = config.title;
            element.appendChild(title);
            element.addClass("bf-has-title");
            if (config.enableDrag) {
                Glodon.Web.Lang.Utility.Dom.drag({
                    element: this.element,
                    handle: title,
                    move: function move(start, end, distance) {
                        self.eventManager.fireEvent('Move', start, end, distance);
                    }
                });
            }
        }
        element.appendChild(cantainer);
        this.cantainer = cantainer;
        if (config.enableSizable) {
            Glodon.Web.Lang.Utility.Dom.sizable({
                element: this.element,
                axis: 'all',
                sizable: function sizable(start, end, distance) {
                    self.eventManager.fireEvent('Sizable', start, end, distance);
                }
            });
        }
        close.addEventListener('click', function () {
            self.hide();
        });
        cantainer.addEventListener('click', function (e) {
            var tr = e.target.closest('.bf-group-title');
            if (tr && tr.hasClass('bf-group-title')) {
                var group = tr.parentNode;
                group.toggleClass('bf-collapse');
            }
        });
    };

    UtilityNS.Type.inheritPrototype(Panel, ControlNS.Control);

    Panel.prototype.setData = function (data) {
        var cantainer = this.cantainer;
        var table = '<table class="bf-table">';
        for (var i = 0, len = data.length; i < len; i++) {
            var group = "<tbody class=\"bf-group\"><tr class=\"bf-group-title\"><td colspan=\"2\"><i class=\"bf-icon\"></i>" + data[i].group + "</td></tr>";
            var items = data[i].items;
            for (var _j = 0, tdLen = items.length; _j < tdLen; _j++) {
                var obj = items[_j];
                var tr = "<tr class=\"bf-group-content\"><td class=\"bf-key\">" + obj.key + "</td><td class=\"bf-value\">" + obj.value + "</td></tr>";
                group += tr;
            }
            group += '</tbody>';
            table += group;
        }
        table += '</table>';
        cantainer.innerHTML = table;
    };
    Panel.prototype.close = function () {
        this.eventManager.fireEvent('Close');
        this.destroy();
    };
    Panel.prototype.hide = function () {
        this.eventManager.fireEvent('Hide');
        this.isShow = false;
        this.element.style.display = 'none';
    };
    Panel.prototype.show = function () {
        this.eventManager.fireEvent('Show');
        this.isShow = true;
        this.element.style.display = '';
    };
    Panel.prototype.toggle = function () {
        if (this.isShow) {
            this.element.style.display = 'none';
        } else {
            this.element.style.display = '';
        }
        this.isShow = !this.isShow;
    };
    Panel.prototype.addControl = function (arg) {
        var controls = this.getControls();
        controls.push(arg);
        this.cantainer.appendChild(arg.element);
    };

    Panel.prototype.getControls = function () {
        return this._controls;
    };

    Panel.prototype.getControl = function (id) {
        var controls = this.getControls();
        return controls.getObjectByAttribute('id', id);
    };

    Panel.prototype.setHtml = function (html) {
        this.cantainer.innerHTML = html;
    };

    PanelNS.Panel = Panel;
})();

(function () {
    var PanelNS = Glodon.Web.Lang.Utility.Namespace.ensureNamespace(Glodon, "Bimface.UI.Panel");
    var ControlConfig = new Glodon.Bimface.UI.Control.ControlConfig();
    var PanelConfig = function PanelConfig() {
        var defaults = {
            className: 'bf-panel',
            title: 'panel',
            css: {
                width: "200px",
                height: "200px",
                minWidth: "200px",
                minHeight: "200px"
            },
            enableDrag: true,
            enableSizable: true
        };
        var config = Object.assign({}, ControlConfig, defaults);
        return config;
    };

    PanelNS.PanelConfig = PanelConfig;
})();

(function () {
    var TreeNS = Glodon.Web.Lang.Utility.Namespace.ensureNamespace(Glodon, "Bimface.UI.Tree");
    var Tree = function Tree(node) {
        var self = this;
        self._root = node;
        self.element = node.element;
        self.eventManager = node.eventManager;
        self.addEventListener = node.addEventListener;
        self.removeEventListener = node.removeEventListener;
        node.addEventListener("SelectionChanged", function (arg) {
            if (self._selectionNode == arg) {
                self._selectionNode = null;
            } else {
                self._selectionNode && self._selectionNode.deselect();
                self._selectionNode = arg;
            }
        });
    };
    Tree.prototype = {
        getRoot: function getRoot() {
            return this._root;
        },
        getChecked: function getChecked() {
            var root = this._root,
                state = [];
            getChildrenChecked(root, {});

            function getChildrenChecked(node, tempState) {
                var checkedState = node.getCheckedState();
                var filter = node.element.getAttribute("data-filter");
                switch (checkedState) {
                    case "unchecked":
                        break;
                    case "checked":
                        if (node == root) {
                            state = "all";
                        } else {
                            var endState = Object.assign({}, tempState);
                            endState[filter] = node.id;
                            state.push(endState);
                        }
                        break;
                    case "half":
                        var children = node.getControls();
                        var nextState = Object.assign({}, tempState);
                        if (node != root) {
                            nextState[filter] = node.id;
                        }
                        for (var i = 0, len = children.length; i < len; i++) {
                            getChildrenChecked(children[i], nextState);
                        }
                        break;
                }
            }
            return state;
        },
        getSelection: function getSelection() {
            var node = this._selectionNode;
            var state = {};
            if (!node) return false;
            getState(node, state);

            function getState(node, tempState) {
                var filter = node.element.getAttribute("data-filter"),
                    parent = node.getParent();
                if (parent) {
                    tempState[filter] = node.id;
                    getState(parent, tempState);
                } else {
                    return tempState;
                }
            }
            return state;
        }
    };
    TreeNS.Tree = Tree;
})();

(function () {
    var ToolbarNS = Glodon.Web.Lang.Utility.Namespace.ensureNamespace(Glodon, "Bimface.UI.Toolbar");
    var TreeNS = Glodon.Web.Lang.Utility.Namespace.ensureNamespace(Glodon, "Bimface.UI.Tree");
    var UtilityNS = Glodon.Web.Lang.Utility.Namespace.ensureNamespace(Glodon, "Web.Lang.Utility");
    var DomNS = Glodon.Web.Lang.Utility.Namespace.ensureNamespace(Glodon, "Web.Lang.Utility.Dom");
    var TreeNode = function TreeNode(config) {
        ToolbarNS.Toolbar.call(this, config);
        this._opt = Object.assign({}, config);
        if (config.hasCheckbox) {
            this._checkedState = config.isChecked ? 'checked' : 'unchecked';
        }
        this._selection = config.selection;
        this._selectionState = 'unSelected';
    };

    UtilityNS.Type.inheritPrototype(TreeNode, ToolbarNS.Toolbar);

    TreeNode.prototype.setData = function (id, name) {
        var self = this;
        var config = this._opt;
        var treeNode = DomNS.create('div', 'bf-tree-node bf-collapse');
        if (config.hasCheckbox) {
            var checkedClass = config.isChecked ? 'bf-checked' : '';
            var checkbox = DomNS.create('span', 'bf-label ' + checkedClass);
            checkbox.innerHTML = "<input type=\"checkbox\" checked=\"" + config.isChecked + "\"><span class=\"bf-checkbox\"></span>";
            this.checkbox = checkbox;
            treeNode.appendChild(checkbox);
            checkbox.addEventListener('click', function (ev) {
                var isChecked = checkbox.getElementsByTagName('input')[0].checked;
                var checkedState = !isChecked ? 'checked' : 'unchecked';
                self.setCheckedState(!isChecked);
                self.eventManager.fireEvent('CheckedChanged', checkedState);
            });
        }
        var treeName = DomNS.create('span', 'bf-tree-name');
        treeName.textContent = name ? name : "未命名";
        treeName.addEventListener('click', function (ev) {
            if (!self._selection) {
                return false;
            }
            var isSelected = this.hasClass('bf-selected');
            isSelected ? self.deselect() : self.select();
            isSelected = !isSelected;
            self._selectionState = isSelected ? 'selected' : 'unselected';
            self.eventManager.fireEvent('SelectionChanged', self, isSelected);
        });
        treeNode.appendChild(treeName);
        this.element.appendChild(treeNode);
        this.treeNode = treeNode;
        this.treeName = treeName;
        this.id = id;
    };

    TreeNode.prototype.addChildNode = function (node) {
        var self = this;
        this._controls.push(node);
        node._parent = this;
        if (!this.subTree) {
            var icon = DomNS.create('span', 'bf-icon');
            var treeNode = this.treeNode;
            icon.addEventListener('click', function () {
                treeNode.toggleClass('bf-collapse');
            });
            treeNode.insertBefore(icon, this.treeNode.children[0]);
            this.subTree = DomNS.create('div', 'bf-sub-tree');
            this.element.appendChild(this.subTree);
        }
        this.subTree.appendChild(node.element);

        node.addEventListener("CheckedChanged", function (enable) {
            self.setParentCheckedState();
        });
        node.addEventListener("SelectionChanged", function (obj, isSelected) {
            self.eventManager.fireEvent("SelectionChanged", obj, isSelected);
        });
    };

    TreeNode.prototype.getCheckedState = function () {
        return this._checkedState;
    };

    TreeNode.prototype.getSelectionState = function () {
        return this._selectionState;
    };

    TreeNode.prototype.getParent = function () {
        if (this._parent) {
            return this._parent;
        } else {
            return false;
        }
    };

    TreeNode.prototype.setCheckedState = function (enable) {
        var config = this._opt;
        this._checkedState = enable ? 'checked' : 'unchecked';
        if (config.hasCheckbox) {
            this.checkbox.getElementsByTagName('input')[0].checked = enable;
            this.checkbox.toggleClass('bf-checked', enable);
            this.checkbox.toggleClass('bf-unchecked', !enable);
            this.checkbox.removeClass('bf-half');
        }
        this.setChildrenCheckedState(enable);
    };

    TreeNode.prototype.setParentCheckedState = function () {
        var children = this.getControls();
        if (children && children.length > 0) {
            var checkedState;
            for (var i = 0, len = children.length; i < len; i++) {
                var testState = children[i].getCheckedState();
                if (!checkedState) {
                    checkedState = testState;
                } else if (testState != checkedState) {
                    checkedState = 'half';
                }
            }
            this._checkedState = checkedState;
        }
        switch (this._checkedState) {
            case 'checked':
                this.checkbox.getElementsByTagName('input')[0].checked = true;
                this.checkbox.addClass('bf-checked');
                this.checkbox.removeClass('bf-unchecked');
                this.checkbox.removeClass('bf-half');
                break;
            case 'unchecked':
                this.checkbox.getElementsByTagName('input')[0].checked = false;
                this.checkbox.addClass('bf-unchecked');
                this.checkbox.removeClass('bf-checked');
                this.checkbox.removeClass('bf-half');
                break;
            case 'half':
                this.checkbox.getElementsByTagName('input')[0].checked = true;
                this.checkbox.addClass('bf-half');
                this.checkbox.removeClass('bf-unchecked');
                this.checkbox.removeClass('bf-checked');
                break;
        }
        this.eventManager.fireEvent('CheckedChanged', checkedState);
    };

    TreeNode.prototype.setChildrenCheckedState = function (enable) {
        var children = this.getControls(),
            len = children.length;
        if (children && len > 0) {
            for (var i = 0; i < len; i++) {
                children[i].setCheckedState(enable);
            }
        }
    };

    TreeNode.prototype.expand = function () {
        this.treeNode.removeClass('bf-collapse');
    };

    TreeNode.prototype.collapse = function () {
        this.treeNode.addClass('bf-collapse');
    };

    TreeNode.prototype.toggleExpansion = function (enable) {
        this.treeNode.toggleClass('bf-collapse', enable);
    };

    TreeNode.prototype.select = function () {
        return this.treeName.addClass('bf-selected');
    };

    TreeNode.prototype.deselect = function () {
        return this.treeName.removeClass('bf-selected');
    };

    TreeNS.TreeNode = TreeNode;
})();

(function () {
    var TreeNS = Glodon.Web.Lang.Utility.Namespace.ensureNamespace(Glodon, "Bimface.UI.Tree");
    var ControlConfig = new Glodon.Bimface.UI.Control.ControlConfig();
    var TreeNodeConfig = function TreeNodeConfig() {
        var defaults = {
            className: 'bf-tree',
            title: 'tree',
            hasCheckbox: true,
            isChecked: true,
            selection: true
        };
        var config = Object.assign(ControlConfig, defaults);
        return config;
    };

    TreeNS.TreeNodeConfig = TreeNodeConfig;
})();