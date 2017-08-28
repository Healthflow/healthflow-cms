import { InvalidRendererException } from "./exceptions";
import Grid from "./renderers/antd/Grid";
import GridHeader from "./renderers/antd/GridHeader/GridHeader";
import GridHeaderMenu from "./renderers/antd/GridHeaderMenu";
import GridFooter from "./renderers/antd/GridFooter";
import GridSidebar from "./renderers/antd/GridSidebar/GridSidebar";
import GridContent from "./renderers/antd/GridContent/GridContent";
import Menu from "./renderers/antd/Menu/Menu";
import Timeline from "./renderers/antd/Timeline";
import HyperLink from "./renderers/HyperLink";
import ActionLink from "./renderers/ActionLink";
import ActionButton from "./renderers/antd/ActionButton";
import StateLink from "./renderers/StateLink";
import Label from "./renderers/Label";
import Logo from "./renderers/antd/Logo";
import SearchInput from "./renderers/antd/SearchInput";
import DataTable from "./renderers/antd/DataTable/DataTable";
import DynamicPage from "./renderers/DynamicPage";
import DynamicComponent from "./renderers/DynamicComponent";
import Card from "./renderers/antd/Card";
import Row from "./renderers/antd/Row";
import Column from "./renderers/antd/Column";
import Tag from "./renderers/antd/Tag";
import List from "./renderers/List";
import ListItem from "./renderers/ListItem";
import Heading from "./renderers/Heading";
import MetaLayout from "./renderers/MetaLayout/MetaLayout";
import RouteNotFound from "./renderers/RouteNotFound";
import Container from "./renderers/Container";
import ForEach from "./renderers/Logic/ForEach";
import If from "./renderers/Logic/If";
import SearchFilter from "./renderers/SearchFilter";
import Modal from "./renderers/antd/Modal";
import Progress from "./renderers/antd/Progress";
import Spinner from "./renderers/antd/Spinner";
import Input from "./renderers/antd/Input";
import DatePicker from "./renderers/antd/DatePicker";
import Select from "./renderers/antd/Select";
import Checkbox from "./renderers/antd/Checkbox";
import Form from "./renderers/antd/Form";
import Textarea from "./renderers/antd/Textarea";

const renderers = {
    "input": Input,
    "date-picker": DatePicker,
    "progress": Progress,
    "modal": Modal,
    "logo": Logo,
    "grid": Grid,
    "grid-header": GridHeader,
    "grid-footer": GridFooter,
    "grid-sidebar": GridSidebar,
    "grid-content": GridContent,
    "menu": Menu,
    "grid-header-menu": GridHeaderMenu,
    "link": HyperLink,
    "action-link": ActionLink,
    "action-button": ActionButton,
    "state-link": StateLink,
    "label": Label,
    "search-input": SearchInput,
    "table": DataTable,
    "page": DynamicPage,
    "component": DynamicComponent,
    "container": Container,
    "card": Card,
    "meta-page": MetaLayout,
    "rout-not-found": RouteNotFound,
    "heading": Heading,
    "tag": Tag,
    "column": Column,
    "row": Row,
    "list": List,
    "list-item": ListItem,
    "for-each": ForEach,
    "if": If,
    "timeline": Timeline,
    "search-filter": SearchFilter,
    "spinner": Spinner,
    "form": Form,
    "select": Select,
    "checkbox": Checkbox,
    "textarea": Textarea
};

const getRenderer = function(rendererType) {

    let renderer = renderers[rendererType];

    if (!renderer) {
        throw new InvalidRendererException(rendererType, renderers);
    }

    return renderer;
};

export default {
    get: getRenderer
};