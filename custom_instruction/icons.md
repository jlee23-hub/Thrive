# Atlassian Design System - Icon Usage Guide

## 🚨 Critical Rules

### Only Use Icons from This List
- **NEVER** suggest icons not listed below
- **NEVER** invent or guess icon names
- **ALWAYS** verify the exact icon name exists

### Common Non-Existent Icons
❌ `@atlaskit/icon/core/folder` → ✅ Use `folder-closed` or `folder-open`
❌ `@atlaskit/icon/core/user` → ✅ Use `person`
❌ `@atlaskit/icon/core/play` → ✅ Use `video-play`
❌ `@atlaskit/icon/core/arrow` → ✅ Use specific direction: `arrow-right`, `arrow-left`, etc.
❌ `@atlaskit/icon/core/chevron` → ✅ Use specific direction: `chevron-down`, `chevron-up`, etc.

### Import Pattern
```tsx
// ✅ CORRECT
import AddIcon from '@atlaskit/icon/core/add';
<AddIcon label="Add item" />

// ❌ WRONG
import { AddIcon } from '@atlaskit/icon';
import AddIcon from '@atlaskit/icon/glyph/add';
```


**Instructions for AI:** Always consult this table when selecting icons. Match the user's request to the Usage description and Keywords. Follow the purpose restrictions (Single purpose vs Multi purpose).

**⚠️ EVERY icon you suggest must be findable in the table below with its exact component name ⚠️**

| Component Name | Package | Usage | Keywords |
|---|---|---|---|
| AccessibilityIcon | @atlaskit/icon/core/accessibility | Reserved for representing accessibility and accessibility-related features and settings | accessibility, icon, core, a11y, accessibility, WCAG |
| AddIcon | @atlaskit/icon/core/add | Single purpose - Reserved for creating and adding an object. | add, plus, create, new, icon, core, create, plus, jira status |
| AiAgentIcon | @atlaskit/icon/core/ai-agent | Single purpose - Reserved for Rovo Agent. | ai-agent, aiagent, icon, core, Rovo, AI, chat agent, ai |
| AiChatIcon | @atlaskit/icon/core/ai-chat | Single purpose - Reserved for Rovo Chat. | ai-chat, aichat, icon, core, Rovo, AI, chat agent, ai |
| AiGenerativeTextSummaryIcon | @atlaskit/icon/core/ai-generative-text-summary | Reserved for summarizing content with Atlassian Intelligence & Loom | ai-generative-text-summary, aigenerativetextsummary, icon, core, summarize, summarise, summary, automation, AI |
| AlertIcon | @atlaskit/icon/core/alert | Single purpose - Reserved for alerts in JSM and Compass. | alert, icon, core, alert, event, operations |
| AlignImageCenterIcon | @atlaskit/icon/core/align-image-center | Single purpose - Reserved for center aligning media and content. | align-image-center, alignimagecenter, icon, core, content, media, image, alignment, centre |
| AlignImageLeftIcon | @atlaskit/icon/core/align-image-left | Single purpose - Reserved for left aligning media and content. | align-image-left, alignimageleft, icon, core, content, media, image, alignment, left |
| AlignImageRightIcon | @atlaskit/icon/core/align-image-right | Single purpose - Reserved for right aligning media and content. | align-image-right, alignimageright, icon, core, content, media, image, alignment, right |
| AlignTextCenterIcon | @atlaskit/icon/core/align-text-center | Multi purpose - Known uses: align text center, align center. | align-text-center, aligntextcenter, icon, core, alignment, text, content |
| AlignTextLeftIcon | @atlaskit/icon/core/align-text-left | Multi purpose - Known uses: align text left, align content left, summary. | align-text-left, aligntextleft, icon, core, alignment, text, content, summary |
| AlignTextRightIcon | @atlaskit/icon/core/align-text-right | Multi purpose - Known uses: align text right, align content right. | align-text-right, aligntextright, icon, core, alignment, text, content |
| AngleBracketsIcon | @atlaskit/icon/core/angle-brackets | Multi purpose - Known uses: code or source code in Bitbucket and Jira. | angle-brackets, anglebrackets, icon, core, code, <>, </>, syntax, jira status |
| ApiIcon | @atlaskit/icon/core/api | Reserved for representing Application Programming Interfaces (APIs). | api, icon, core, application programming interface, api, operations |
| AppIcon | @atlaskit/icon/core/app | Single purpose - Reserved for marketplace apps and integrations across products. | app, icon, core, add-on, add on, plugin, external app, third-party app |
| AppSwitcherIcon | @atlaskit/icon/core/app-switcher | Single purpose - Reserved for app switcher in global product navigation. | app-switcher, appswitcher, icon, core, application switcher, change product, switch product, product switcher |
| AppSwitcherLegacyIcon | @atlaskit/icon/core/app-switcher-legacy | Single purpose - Reserved for the legacy app switcher in global product navigation. | app-switcher-legacy, appswitcherlegacy, icon, core, application switcher, change product, switch product, product switcher |
| AppsIcon | @atlaskit/icon/core/apps | Single purpose - Reserved for adding or viewing apps. | apps, icon, core, third-party, applications |
| ArchiveBoxIcon | @atlaskit/icon/core/archive-box | Multi purpose - Known uses: archiving pages, storage. | archive-box, archivebox, icon, core, file box |
| ArrowDownIcon | @atlaskit/icon/core/arrow-down | Multi purpose - Know uses: sorting table headers or Bitbucket code difference. | arrow-down, arrowdown, icon, core, down, bottom, sorting |
| ArrowDownLeftIcon | @atlaskit/icon/core/arrow-down-left | Known uses: Adding content from Rovo Chat into Editor. | arrow-down-left, arrowdownleft, icon, core, diagonal arrow, down, left, south west |
| ArrowDownRightIcon | @atlaskit/icon/core/arrow-down-right | Known uses: TBC | arrow-down-right, arrowdownright, icon, core, diagonal arrow, down, right, south east |
| ArrowLeftIcon | @atlaskit/icon/core/arrow-left | Multi purpose - Known uses: back to previous screen, previous slide. | arrow-left, arrowleft, back, previous, icon, core, back, previous |
| ArrowRightIcon | @atlaskit/icon/core/arrow-right | Multi purpose - Known uses: link to nested menu item, a linked menu item, next slide. | arrow-right, arrowright, forward, next, icon, core, forward, next, link |
| ArrowUpIcon | @atlaskit/icon/core/arrow-up | Multi purpose - Known uses: back to top. | arrow-up, arrowup, icon, core, improvement, jira status |
| ArrowUpLeftIcon | @atlaskit/icon/core/arrow-up-left | Known uses: TBC | arrow-up-left, arrowupleft, icon, core, diagonal arrow, up, right, north east |
| ArrowUpRightIcon | @atlaskit/icon/core/arrow-up-right | Multi purpose | arrow-up-right, arrowupright, icon, core, open, diagonal arrow |
| AssetsIcon | @atlaskit/icon/core/assets | Reserved for JSM Assets. | assets, icon, core, assets, CMDB, configuration management database |
| AtlassianIntelligenceIcon | @atlaskit/icon/core/atlassian-intelligence | Single purpose - Reserved for Atlassian Intelligence products or experiences. | atlassian-intelligence, atlassianintelligence, icon, core, AI |
| AttachmentIcon | @atlaskit/icon/core/attachment | Reserved for attaching files to work types or other objects. | attachment, paperclip, icon, core, paperclip, attach, attachment |
| AudioIcon | @atlaskit/icon/core/audio | 📦 @atlaskit/icon/core/audio | audio, music, note, sound, icon, core, music, musical note |
| AutomationIcon | @atlaskit/icon/core/automation | Single purpose - Reserved to represent an Automation. | automation, icon, core, lightningbolt, automation rule |
| BacklogIcon | @atlaskit/icon/core/backlog | Single purpose - Reserved for backlogs in Jira. | backlog, icon, core, rows |
| BasketballIcon | @atlaskit/icon/core/basketball | Multi purpose - Known usages: Sport emoji category. | basketball, icon, core, ball, sports, basketball |
| BoardIcon | @atlaskit/icon/core/board | Single purpose - Reserved for boards in Jira. | board, icon, core, columns, active sprint |
| BoardsIcon | @atlaskit/icon/core/boards | Single purpose - Reserved as the icon to represent multiple boards. | boards, icon, core |
| BookWithBookmarkIcon | @atlaskit/icon/core/book-with-bookmark | Multi purpose - Known uses: knowledge bases, articles, and other representations of books or info. | book-with-bookmark, bookwithbookmark, icon, core, knowledge base, article |
| BorderIcon | @atlaskit/icon/core/border | Reserved for toggling the visibility of a border on an object. | border, icon, core, border, image border, content border, editor, confluence |
| BranchIcon | @atlaskit/icon/core/branch | Single purpose - Reserved for branches in Bitbucket and Jira. | branch, icon, core, git branch, bitbucket branch, branches, jira status |
| BriefcaseIcon | @atlaskit/icon/core/briefcase | Multi purpose - Known uses: Job title in Atlas, Operations in JSM. | briefcase, icon, core, suitcase, toolbox, operations, business |
| BugIcon | @atlaskit/icon/core/bug | Multi purpose - Known uses: Request types in JSM, bugs in Jira. | bug, icon, core, bug report, test |
| CalendarIcon | @atlaskit/icon/core/calendar | Multi purpose - Known uses: date metadata, date input field, calendar view, jira status. | calendar, date, icon, core, date, month, day, year, jira status |
| CalendarPlusIcon | @atlaskit/icon/core/calendar-plus | Known uses: Auto-scheduling in Jira Plans. Scheduled dates. | calendar-plus, calendarplus, icon, core, calendar, add, plus, schedule |
| CameraIcon | @atlaskit/icon/core/camera | Multi purpose - Known uses: upload photo in Trello, photos. | camera, photo, icon, core |
| CaptureIcon | @atlaskit/icon/core/capture | Reserved for representing Focus Areas. | capture, icon, core, focus, focus area, capture |
| CardIcon | @atlaskit/icon/core/card | Known uses: Representing cards in Trello. Toggling card detail in Jira. | card, icon, core, card |
| CashIcon | @atlaskit/icon/core/cash | Known usages: 'Sales' work type. | cash, icon, core, currency, money, cash, dollar, bill, work type |
| ChangesIcon | @atlaskit/icon/core/changes | Single purpose - Reserved for changes in Jira. | changes, icon, core, jira status, horizontal arrows |
| ChartBarIcon | @atlaskit/icon/core/chart-bar | Multi purpose - Known uses: Reports in JSM, Space Analytics in Confluence, and other graph charts. | chart-bar, chartbar, icon, core, graph, bar, analytics, report |
| ChartMatrixIcon | @atlaskit/icon/core/chart-matrix | Multi purpose - Known uses: Matrix view in in JPD, and other matrix charts. | chart-matrix, chartmatrix, icon, core, dot chart, graph, matrix,  |
| ChartPieIcon | @atlaskit/icon/core/chart-pie | Multi purpose - Known uses: pie charts. | chart-pie, chartpie, icon, core, segment, chart, graph, pie |
| ChartTrendIcon | @atlaskit/icon/core/chart-trend | Multi purpose - Known uses: charts, reports in Jira, and sprint insights. | chart-trend, charttrend, icon, core, reports, graph, impact effort,  |
| ChatWidgetIcon | @atlaskit/icon/core/chat-widget | Reserved for representing a chat widget triggered by a floating action button. | chat-widget, chatwidget, icon, core, chat, widget, virtual service agent, vsa |
| CheckCircleIcon | @atlaskit/icon/core/check-circle | Known uses: completed items, productivity emoji category. Completed task work type in JSM Calendar view. | check-circle, checkcircle, tick, icon, core, tick, yes, completed, filled |
| CheckMarkIcon | @atlaskit/icon/core/check-mark | Multi purpose - Known uses: table cells, checkboxes. | check-mark, checkmark, icon, core, tick |
| CheckboxCheckedIcon | @atlaskit/icon/core/checkbox-checked | Multi purpose - Reserved for interactive checkbox experiences. Consider using the checkbox component. | checkbox-checked, checkboxchecked, icon, core, filled, checked, select all |
| CheckboxIndeterminateIcon | @atlaskit/icon/core/checkbox-indeterminate | Multi purpose - Reserved for interactive checkbox experiences. Consider using the checkbox component. | checkbox-indeterminate, checkboxindeterminate, icon, core, filled, mixed |
| CheckboxUncheckedIcon | @atlaskit/icon/core/checkbox-unchecked | Multi purpose - Reserved for interactive checkbox experiences. Consider using the checkbox component. | checkbox-unchecked, checkboxunchecked, icon, core, unchecked |
| ChevronDoubleLeftIcon | @atlaskit/icon/core/chevron-double-left | Known uses: Navigate to previous year in calendar/date picker | chevron-double-left, chevrondoubleleft, icon, core, double chevron, previous year, left |
| ChevronDoubleRightIcon | @atlaskit/icon/core/chevron-double-right | Known uses: Navigate to next year in calendar/date picker | chevron-double-right, chevrondoubleright, icon, core, double chevron, right, next year |
| ChevronDownIcon | @atlaskit/icon/core/chevron-down | Do not use 16px chevrons within buttons, icon buttons, or dropdowns to maintain visual cohesion with ADS which uses 12px chevrons. Known uses: Open dropdown menu, expanded tree item, collapse tree item | chevron-down, chevrondown, expand, collapse, icon, core, chevron down, expand, open |
| ChevronLeftIcon | @atlaskit/icon/core/chevron-left | Do not use 16px chevrons within buttons, icon buttons, or dropdowns to maintain visual cohesion with ADS which uses 12px chevrons. Known uses: Navigate back, show previous page of pagination results | chevron-left, chevronleft, back, previous, icon, core, chevron left, back, previous |
| ChevronRightIcon | @atlaskit/icon/core/chevron-right | Do not use 16px chevrons within buttons, icon buttons, or dropdowns to maintain visual cohesion with ADS which uses 12px chevrons. Known uses: Next page of pagination results, collapsed tree item, expand tree item | chevron-right, chevronright, forward, next, icon, core, chevron right, next, collapsed, expand, show children |
| ChevronUpIcon | @atlaskit/icon/core/chevron-up | Do not use 16px chevrons within buttons, icon buttons, or dropdowns to maintain visual cohesion with ADS which uses 12px chevrons. Known uses: Close dropdown menu | chevron-up, chevronup, expand, collapse, icon, core, chevron up, close dropdown menu, collapse |
| ChildWorkItemsIcon | @atlaskit/icon/core/child-work-items | Reserved for child work items. | child-work-items, childworkitems, icon, core, children, child, related, work items |
| ClipboardIcon | @atlaskit/icon/core/clipboard | Known uses: Pasting content from clipboard. | clipboard, icon, core, clipboard, paste |
| ClockIcon | @atlaskit/icon/core/clock | Known uses: recent, time input, sprint time remaining, overdue task work type status. | clock, icon, core, time, recent, history |
| CloseIcon | @atlaskit/icon/core/close | Known uses: closing modals, panels, and transient views; removing tags | close, icon, core, cross, x, close, remove |
| CloudArrowUpIcon | @atlaskit/icon/core/cloud-arrow-up | Multi purpose - Known uses: deployments in Jira. | cloud-arrow-up, cloudarrowup, icon, core, deployments, up arrow |
| CollapseHorizontalIcon | @atlaskit/icon/core/collapse-horizontal | Single purpose - Reserved for contracting or reducing the width of an element to its smallest size. | collapse-horizontal, collapsehorizontal, icon, core, collapse, width, horizontal arrows |
| CollapseVerticalIcon | @atlaskit/icon/core/collapse-vertical | Single purpose - Reserved for contracting or reducing the height of an element to its smallest size. | collapse-vertical, collapsevertical, icon, core, collapse, height, vertical arrows |
| CommentIcon | @atlaskit/icon/core/comment | Single purpose - Reserved for comments on objects. | comment, chat, speech, icon, core, speech bubble |
| CommentAddIcon | @atlaskit/icon/core/comment-add | Single purpose - Reserved for adding a comment to an object. | comment-add, commentadd, icon, core, speech bubble, plus |
| CommitIcon | @atlaskit/icon/core/commit | Single purpose - Reserved for commits in Jira or Bitbucket. | commit, icon, core, git commit, bitbucket commit |
| CompassIcon | @atlaskit/icon/core/compass | Multi purpose - Known uses: templates. | compass, icon, core, template |
| ComponentIcon | @atlaskit/icon/core/component | Single purpose - Reserved for components in Jira and Compass. | component, block, lego, icon, core, lego, brick, block |
| ContentWidthNarrowIcon | @atlaskit/icon/core/content-width-narrow | Single purpose - Reserved for setting media and content to a narrow width. | content-width-narrow, contentwidthnarrow, icon, core, content, media, image, width, fixed, narrow |
| ContentWidthWideIcon | @atlaskit/icon/core/content-width-wide | Single purpose - Reserved for setting media and content to a wide width. | content-width-wide, contentwidthwide, icon, core, content, media, image, width, fixed, wide |
| ContentWrapLeftIcon | @atlaskit/icon/core/content-wrap-left | Single purpose - Reserved for left aligning media and content with wrapping enabled. | content-wrap-left, contentwrapleft, icon, core, content, media, image, alignment, left, inline, wrap |
| ContentWrapRightIcon | @atlaskit/icon/core/content-wrap-right | Single purpose - Reserved for right aligning media and content with wrapping enabled. | content-wrap-right, contentwrapright, icon, core, content, media, image, alignment, right, inline, wrap |
| CopyIcon | @atlaskit/icon/core/copy | Single purpose - Reserved for copying data such as text, code or other objects. | copy, duplicate, icon, core, copy, object |
| CreditCardIcon | @atlaskit/icon/core/credit-card | Multi purpose - Known uses: billing in Admin, invoices in PPC, payments. | credit-card, creditcard, icon, core, payment, invoice |
| CrossIcon | @atlaskit/icon/core/cross | Known uses: closing modals, panels, and transient views; removing tags | cross, close, x, cancel, icon, core, cross, x, close, remove |
| CrossCircleIcon | @atlaskit/icon/core/cross-circle | Multi purpose - Known uses: clear text field, error status. | cross-circle, crosscircle, close, x, cancel, icon, core, x, exit, clear, no, filled |
| CurlyBracketsIcon | @atlaskit/icon/core/curly-brackets | Known uses: Represents Smart values in Proforma. | curly-brackets, curlybrackets, icon, core, curly brackets, braces, smart value |
| CustomizeIcon | @atlaskit/icon/core/customize | Multi purpose - Known uses: customize sidebar, customize view, settings. | customize, icon, core, customise, configure, modify, preferences, settings, sliders |
| DashboardIcon | @atlaskit/icon/core/dashboard | Single purpose - Reserved for dashboards in Jira. | dashboard, window, grid, icon, core, activity, view |
| DataFlowIcon | @atlaskit/icon/core/data-flow | Multi purpose - Known usages: Database schema in Jira. | data-flow, dataflow, icon, core, relationship, data, flow chart |
| DataNumberIcon | @atlaskit/icon/core/data-number | Known uses: Representing number datatype fields in Proforma and databases. | data-number, datanumber, icon, core, numbers, 123, proforma, datatype |
| DataStringIcon | @atlaskit/icon/core/data-string | Known uses: Representing string datatype fields in Proforma and databases. | data-string, datastring, icon, core, string, letters, abc, proforma, datatype |
| DatabaseIcon | @atlaskit/icon/core/database | Single purpose - Reserved for databases in Confluence. | database, icon, core, spreadsheet, table, data, cells |
| DecisionIcon | @atlaskit/icon/core/decision | Single purpose - Reserved for decisions. | decision, icon, core, fork, diagonal arrow |
| DefectIcon | @atlaskit/icon/core/defect | Reserved for defect work type. | defect, icon, core, defect, fragile, cracked, work type |
| DeleteIcon | @atlaskit/icon/core/delete | Single purpose - Reserved for removing or deleting an object. | delete, icon, core, trash, bin, remove |
| DepartmentIcon | @atlaskit/icon/core/department | Single purpose - Reserved for departments, reporting lines, or other tree chart representations. | department, icon, core, organization, organisation, org chart, hierarchy |
| DeviceMobileIcon | @atlaskit/icon/core/device-mobile | Multi purpose - Known uses: call, contact us. | device-mobile, devicemobile, icon, core, iphone, mobile phone, cell phone |
| DevicesIcon | @atlaskit/icon/core/devices | Known usages: 'Asset' work type. | devices, icon, core, devices, assets, laptop, phone, hardware, work type |
| DiscoveryIcon | @atlaskit/icon/core/discovery | Reserved for discovery statuses and messaging. Filled status icons provide higher visual contrast to draw attention to important information. | discovery, icon, core, discovery, note, filled, onboarding, status |
| DownloadIcon | @atlaskit/icon/core/download | Single purpose - Reserved for file downloads. | download, cloud, icon, core, down arrow, file download |
| DragHandleHorizontalIcon | @atlaskit/icon/core/drag-handle-horizontal | Reserved for dragging elements along a horizontal axis. | drag-handle-horizontal, draghandlehorizontal, icon, core, drag handler, reorder, move, reorder horizontal |
| DragHandleVerticalIcon | @atlaskit/icon/core/drag-handle-vertical | Reserved for dragging elements along a vertical axis. | drag-handle-vertical, draghandlevertical, icon, core, drag handler, reorder, move, reorder vertical |
| EditIcon | @atlaskit/icon/core/edit | Single purpose - Reserved for editing objects. | edit, pencil, write, icon, core, pencil, pencil on page |
| EditBulkIcon | @atlaskit/icon/core/edit-bulk | Single purpose - Reserved for editing multiple objects in bulk. | edit-bulk, editbulk, icon, core, edit, pencil, multiple, bulk, change |
| EmailIcon | @atlaskit/icon/core/email | Single purpose - Reserved for when an email-related things. | email, icon, core, envelope, message |
| EmojiIcon | @atlaskit/icon/core/emoji | Single purpose - Reserved for Editor as a category for Emoji's. | emoji, emoticon, smiley, icon, core, smiley face, emoticon |
| EmojiAddIcon | @atlaskit/icon/core/emoji-add | Single purpose - Reserved for adding an emoji reaction. | emoji-add, emojiadd, icon, core, smiley face, emoticon, plus |
| EmojiCasualIcon | @atlaskit/icon/core/emoji-casual | Reserved for representing a casual or relaxed tone or sentiment. | emoji-casual, emojicasual, icon, core, emoij, casual, sunglasses, chill, relaxed |
| EmojiNeutralIcon | @atlaskit/icon/core/emoji-neutral | Reserved for representing a neutral tone or sentiment. | emoji-neutral, emojineutral, icon, core, emoji, neutral, ambivalent |
| EmojiRemoveIcon | @atlaskit/icon/core/emoji-remove | Reserved for removing emoji. | emoji-remove, emojiremove, icon, core, emoji, remove, strikethrough |
| EpicIcon | @atlaskit/icon/core/epic | Single purpose - Reserved for epics in Jira. | epic, icon, core, lightning bolt, jira status, filled |
| ErrorIcon | @atlaskit/icon/core/error | Reserved for error statuses and messaging. Filled status icons provide higher visual contrast to draw attention to important information. | error, warning, alert, icon, core, filled, status, danger, exclamation, !, error |
| ExclamationSquareIcon | @atlaskit/icon/core/exclamation-square | Known uses: Exclamation work type. | exclamation-square, exclamationsquare, icon, core, !, exclaim, square, work type |
| ExpandHorizontalIcon | @atlaskit/icon/core/expand-horizontal | Single purpose - Reserved for expanding an element to its maximum width. | expand-horizontal, expandhorizontal, icon, core, expand, width, horizontal arrows, maximum width, stretch, fit |
| ExpandVerticalIcon | @atlaskit/icon/core/expand-vertical | Single purpose - Reserved for expanding an element to its maximum height. | expand-vertical, expandvertical, icon, core, expand, height, vertical arrows, maximum height, stretch, fit |
| EyeOpenIcon | @atlaskit/icon/core/eye-open | Multi purpose - Known uses: watch page in Confluence, show password in text field, and following in Atlas. | eye-open, eyeopen, icon, core, watch, visible, visbility, permissions |
| EyeOpenFilledIcon | @atlaskit/icon/core/eye-open-filled | Multi purpose - Known uses: watched pages in Confluence. | eye-open-filled, eyeopenfilled, icon, core, watching, visible, visbility, permissions, filled |
| EyeOpenStrikethroughIcon | @atlaskit/icon/core/eye-open-strikethrough | Multi purpose - Intended uses: unwatch page in Confluence, hide password in text field, and unfollow in Atlas. | eye-open-strikethrough, eyeopenstrikethrough, icon, core, unwatch, invisible, visibility, permissions |
| FeedIcon | @atlaskit/icon/core/feed | Single purpose - Reserved for update feeds in Atlassian Home. | feed, icon, core, feed, updates, release notes, what's new |
| FeedbackIcon | @atlaskit/icon/core/feedback | Single purpose - Known uses: customer feedback. | feedback, announce, speaker, megaphone, icon, core, diagonal arrow, chat bubble, survey, critique |
| FieldIcon | @atlaskit/icon/core/field | Multi purpose - Known usages: Field suggestions provided by Atlassian Intelligence. | field, icon, core, field, form, input, label |
| FieldAlertIcon | @atlaskit/icon/core/field-alert | Known uses: Changed field values in Automation. | field-alert, fieldalert, icon, core, field, alert, warning, change |
| FieldCheckboxGroupIcon | @atlaskit/icon/core/field-checkbox-group | Known uses: Checkbox group field type in Proforma. | field-checkbox-group, fieldcheckboxgroup, icon, core, form, field, input type, checkbox, multi-select, options |
| FieldDropdownIcon | @atlaskit/icon/core/field-dropdown | Known uses: Dropdown field type in Proforma. | field-dropdown, fielddropdown, icon, core, form, field, select, dropdown |
| FieldRadioGroupIcon | @atlaskit/icon/core/field-radio-group | Known uses: Radio group field type in Proforma. | field-radio-group, fieldradiogroup, icon, core, form, field, input type, radio, single-select, options |
| FileIcon | @atlaskit/icon/core/file | Multi purpose - Known uses: document, file. Do not use to represent a page — use the dedicated 'Page' icon instead. | file, document, paper, page, sheet, icon, core, document, file, paper |
| FilesIcon | @atlaskit/icon/core/files | Multi purpose - Known uses: documents, files. Do not use to represent pages — use the dedicated 'Pages' icon instead. | files, icon, core, documents, files, papers |
| FilterIcon | @atlaskit/icon/core/filter | Single purpose - Reserved for filterting data or objects. | filter, icon, core, funnel, refine |
| FlagIcon | @atlaskit/icon/core/flag | Multi purpose - Known uses: flags in Editor, feature flags. | flag, icon, core, important, emoji category |
| FlagFilledIcon | @atlaskit/icon/core/flag-filled | Multi purpose - Known uses: active feature flags. | flag-filled, flagfilled, icon, core, flag, important, filled |
| FlaskIcon | @atlaskit/icon/core/flask | Multi purpose - Known uses: labs in Jira. | flask, icon, core, labs, test, erlenmeyer flask, beaker |
| FocusAreaIcon | @atlaskit/icon/core/focus-area | Reserved for representing Focus Areas. | focus-area, focusarea, icon, core, focus, focus area, capture |
| FolderClosedIcon | @atlaskit/icon/core/folder-closed | Single purpose - Reserved for folders in Confluence. | folder-closed, folderclosed, icon, core, directory |
| FolderOpenIcon | @atlaskit/icon/core/folder-open | Single purpose - Reserved for open folders in Confluence. | folder-open, folderopen, icon, core, directory |
| FormIcon | @atlaskit/icon/core/form | Known uses: Represents forms across Atlassian products, including Proforma. | form, icon, core, form, fields |
| FullscreenEnterIcon | @atlaskit/icon/core/fullscreen-enter | Single purpose - Reserved for full screen videos or objects. | fullscreen-enter, fullscreenenter, icon, core, full screen |
| FullscreenExitIcon | @atlaskit/icon/core/fullscreen-exit | Single purpose - Reserved for return screen videos or objects. | fullscreen-exit, fullscreenexit, icon, core, un-full screen, un-fullscreen |
| GlassesIcon | @atlaskit/icon/core/glasses | Known uses: Changing tone of written content to Educational with Atlassian Intelligence. | glasses, icon, core, glasses, knowledge, learning, spectacles, education |
| GlobeIcon | @atlaskit/icon/core/globe | Multi purpose - Known uses: public link in Confluence share dialog, global rules in Automation. | globe, icon, core, world |
| GoalIcon | @atlaskit/icon/core/goal | Single purpose - Reserved for goals in Atlas. | goal, icon, core, target |
| GridIcon | @atlaskit/icon/core/grid | Multi purpose - Known uses: spaces in Confluence, and grid view, all content in Confluence. | grid, icon, core, view all content, tile view, layout, grid, tiles |
| GrowDiagonalIcon | @atlaskit/icon/core/grow-diagonal | Single purpose - Reserved for increasing the size of an element when height and width are changed concurrently. | grow-diagonal, growdiagonal, icon, core, grow, width and height, diagonal arrows |
| GrowHorizontalIcon | @atlaskit/icon/core/grow-horizontal | Single purpose - Reserved for increasing the width of an element. | grow-horizontal, growhorizontal, icon, core, grow, width, horizontal arrows |
| GrowVerticalIcon | @atlaskit/icon/core/grow-vertical | Single purpose - Reserved for increasing the height of an element. | grow-vertical, growvertical, icon, core, grow, height, vertical arrows |
| HashtagIcon | @atlaskit/icon/core/hashtag | Multi purpose - Known uses: topics in Atlas, tags. | hashtag, icon, core, tag, topic, pound |
| HeadphonesIcon | @atlaskit/icon/core/headphones | Known uses: music, audio. | headphones, icon, core, audio, music, headphones |
| HeartIcon | @atlaskit/icon/core/heart | Multi purpose - Known uses: emoji symbols in Editor. | heart, icon, core, like, love, emoji category |
| HighlightIcon | @atlaskit/icon/core/highlight | Single purpose - Reserved for highlight text tool in Confluence Editor. | highlight, icon, core, highlight, highlighter, stabilo, pen |
| HomeIcon | @atlaskit/icon/core/home | Single purpose - Reserved for home in navigation. When a user clicks on this, they should return to the homepage. | home, icon, core, house, building |
| ImageIcon | @atlaskit/icon/core/image | Multi purpose - Known uses: images, image upload. | image, picture, photo, icon, core, picture, asset |
| ImageFullscreenIcon | @atlaskit/icon/core/image-fullscreen | Reserved for viewing an image in a fullscreen view or modal. | image-fullscreen, imagefullscreen, icon, core, image, fullscreen, enlarge |
| ImageInlineIcon | @atlaskit/icon/core/image-inline | Reserved for representing inline images in Editor. | image-inline, imageinline, icon, core, image, layout, inline |
| ImageScaledIcon | @atlaskit/icon/core/image-scaled | Reserved for representing scaled images in layouts akin to display block. | image-scaled, imagescaled, icon, core, image, layout, scaled |
| InboxIcon | @atlaskit/icon/core/inbox | Multi purpose - Known uses: 'Your work' in Confluence, inbox, mail. | inbox, icon, core, document tray, work, letter, post |
| IncidentIcon | @atlaskit/icon/core/incident | Single purpose - Reserved for incidents in Jira. | incident, icon, core, witches hat, traffic cone, jira status |
| InformationIcon | @atlaskit/icon/core/information | Reserved for information statuses and messaging.  Filled status icons provide higher visual contrast to draw attention to important information. For information tooltips, use the unfilled 'information circle' icon. | information, icon, core, info, filled, status, information |
| InformationCircleIcon | @atlaskit/icon/core/information-circle | Known uses: For highlighting information when less visual emphasis is needed within the UI compared to the filled information status icon. | information-circle, informationcircle, icon, core, information, circle, info |
| KeyResultIcon | @atlaskit/icon/core/key-result | Reserved for representing key results. | key-result, keyresult, icon, core, target, bullseye, key result, arrow, bow, archery, OKR |
| LayoutOneColumnIcon | @atlaskit/icon/core/layout-one-column | Reserved for single column layout option in Confluence Editor | layout-one-column, layoutonecolumn, icon, core, layout, column, 1 col |
| LayoutThreeColumnsIcon | @atlaskit/icon/core/layout-three-columns | Single purpose - Reserved for 3 column layout option in Confluence Editor. | layout-three-columns, layoutthreecolumns, icon, core, layout, columns, 3 col, 3 cols |
| LayoutThreeColumnsSidebarsIcon | @atlaskit/icon/core/layout-three-columns-sidebars | Single purpose - Reserved for 3 column layout with left and right sidebars option in Confluence Editor. | layout-three-columns-sidebars, layoutthreecolumnssidebars, icon, core, layout, columns, 3 col, 3 cols, sidebars, asides |
| LayoutTwoColumnsIcon | @atlaskit/icon/core/layout-two-columns | Single purpose - Reserved for 2 column layout option in Confluence Editor. | layout-two-columns, layouttwocolumns, icon, core, layout, columns, 2 col, 2 cols |
| LayoutTwoColumnsSidebarLeftIcon | @atlaskit/icon/core/layout-two-columns-sidebar-left | Single purpose - Reserved for 2 column layout with left sidebar option in Confluence Editor. | layout-two-columns-sidebar-left, layouttwocolumnssidebarleft, icon, core, layout, columns, 2 col, 2 cols, sidebar, aside |
| LayoutTwoColumnsSidebarRightIcon | @atlaskit/icon/core/layout-two-columns-sidebar-right | Single purpose - Reserved for 2 column layout with right sidebar option in Confluence Editor. | layout-two-columns-sidebar-right, layouttwocolumnssidebarright, icon, core, layout, columns, 2 col, 2 cols, sidebar, aside |
| LibraryIcon | @atlaskit/icon/core/library | Single purpose - Reserved for library view in Atlassian Home. | library, icon, core, library, drawer, drawers, filing cabinet |
| LightbulbIcon | @atlaskit/icon/core/lightbulb | Known uses: learnings in Atlas. | lightbulb, idea, hint, icon, core, idea, initiative, tip, learnings |
| LinkIcon | @atlaskit/icon/core/link | Single purpose - Reserved for links, urls, or copy link. | link, icon, core, url, hyperlink, website, www, http,  |
| LinkBrokenIcon | @atlaskit/icon/core/link-broken | Single purpose - Reserved for removing a link. | link-broken, linkbroken, icon, core, unlink, remove link, break link, url, hyperlink, website, www, https |
| LinkExternalIcon | @atlaskit/icon/core/link-external | Single purpose - Reserved for links that open up a new tab. | link-external, linkexternal, icon, core, new tab, new window, open in, url, hyperlink, www, http, https, website, external, shortcut, diagonal arrow, offsite |
| ListBulletedIcon | @atlaskit/icon/core/list-bulleted | Multi purpose - Known uses: bulleted lists, view all. | list-bulleted, listbulleted, icon, core, bullets, unordered list |
| ListChecklistIcon | @atlaskit/icon/core/list-checklist | Known usages: Checklist, 'Requirement' work type. | list-checklist, listchecklist, icon, core, list, check mark, to-do, requirements, checklist, work type |
| ListNumberedIcon | @atlaskit/icon/core/list-numbered | Multi purpose - Known usages: Numbered list in Confluence Editor. | list-numbered, listnumbered, icon, core, list, numbers |
| LobbyBellIcon | @atlaskit/icon/core/lobby-bell | Multi purpose - Known uses: risks in Atlas. | lobby-bell, lobbybell, icon, core, ding, risks |
| LocationIcon | @atlaskit/icon/core/location | Multi purpose - Known uses: location in Atlas. | location, pin, gps, map, icon, core, map, pin, address |
| LockLockedIcon | @atlaskit/icon/core/lock-locked | Multi purpose - Known uses: secure password in textfields, locked page in Confluence. | lock-locked, locklocked, icon, core, permissions, no access, restricted, security, secure, forbidden, authentication |
| LockUnlockedIcon | @atlaskit/icon/core/lock-unlocked | Multi purpose - Known uses: unlocked page in Confluence. | lock-unlocked, lockunlocked, icon, core, open permissions, unrestricted access, security, insecure, authentication |
| LogInIcon | @atlaskit/icon/core/log-in | Single purpose - Reserved for log in. | log-in, login, icon, core, sign in, enter, account |
| LogOutIcon | @atlaskit/icon/core/log-out | Single purpose - Reserved for log out. | log-out, logout, icon, core, sign out, exit, account |
| MagicWandIcon | @atlaskit/icon/core/magic-wand | Multi purpose | magic-wand, magicwand, icon, core, magic, wand, suggestion |
| MarkdownIcon | @atlaskit/icon/core/markdown | Reserved for representing the Markdown markup language. | markdown, icon, core, markdown, md, markup |
| MarketplaceIcon | @atlaskit/icon/core/marketplace | Single purpose - Reserved for Atlassian Marketplace. | marketplace, store, shop, icon, core, app store, storefront, stand, third-party developer |
| MaximizeIcon | @atlaskit/icon/core/maximize | Single purpose - Reserved for resizing screens, panels, modals, or media to its maximum size. | maximize, icon, core, diagonal, resize, enlarge |
| MegaphoneIcon | @atlaskit/icon/core/megaphone | Multi purpose - Known uses: feedback in products. | megaphone, icon, core, announcement, bullhorn, feedback, news |
| MentionIcon | @atlaskit/icon/core/mention | Single purpose - Reserved for user mentions. | mention, user, person, @, icon, core, at symbol, @, tag, username |
| MenuIcon | @atlaskit/icon/core/menu | Single purpose - Reserved for accessing the menu in global product navigation. | menu, hamburger, navigation, switcher, app switcher, icon, core, menu, top navigation, 3 lines, hamburger |
| MergeFailureIcon | @atlaskit/icon/core/merge-failure | Single purpose - Reserved for branches in Bitbucket and Jira that have failed to merge. | merge-failure, mergefailure, icon, core, git merge, bitbucket merge, merge fail, cross, x |
| MergeSuccessIcon | @atlaskit/icon/core/merge-success | Single purpose - Reserved for branches in Bitbucket and Jira that have successfully merged. | merge-success, mergesuccess, icon, core, git merge, bitbucket merge, merge success, check mark |
| MicrophoneIcon | @atlaskit/icon/core/microphone | Multi purpose - Known uses: record sounds in Trello. | microphone, icon, core, mic, mic on, voice, speak |
| MinimizeIcon | @atlaskit/icon/core/minimize | Single purpose - Reserved for minimizing or docking modals to the bottom of the viewport. | minimize, icon, core, minimize, dock |
| MinusIcon | @atlaskit/icon/core/minus | Multi purpose - Known uses: horizontal rule in Editor. | minus, icon, core, rule, horizontal line, divider, minus, subtract |
| MinusSquareIcon | @atlaskit/icon/core/minus-square | Known usages: 'Remove feature' work type. | minus-square, minussquare, icon, core, square, minus, subtract, work type |
| NodeIcon | @atlaskit/icon/core/node | Single purpose - Reserved for a non-expandable item in a page tree. | node, icon, core, page, dot, page tree, navigation |
| NoteIcon | @atlaskit/icon/core/note | Single purpose - Reserved for notes. | note, icon, core, note, post-it, sticky |
| NotificationIcon | @atlaskit/icon/core/notification | Single purpose - Reserved for notifications within global product navigation and within product screens. | notification, bell, alarm, icon, core, bell, alert |
| NotificationMutedIcon | @atlaskit/icon/core/notification-muted | Single purpose - Reserved for muting or disabling notifications. | notification-muted, notificationmuted, icon, core, bell, alert, notification, mute |
| ObjectiveIcon | @atlaskit/icon/core/objective | Single purpose - Reserved for objectives. | objective, icon, core, target, bullseye, objective |
| OfficeBuildingIcon | @atlaskit/icon/core/office-building | Multi purpose - Known uses: office in Atlas, company. | office-building, officebuilding, icon, core, organization, organisation, business |
| OnCallIcon | @atlaskit/icon/core/on-call | Single purpose - Reserved for representing on-call across Atlassian products. | on-call, oncall, icon, core, phone, on-call, support |
| OperationsIcon | @atlaskit/icon/core/operations | Single purpose - Reserved for IT Operations. | operations, icon, core, incident management, alerting, opsgenie, it operations, it ops, radar |
| PageIcon | @atlaskit/icon/core/page | Single purpose - Reserved for pages in Confluence. | page, file, document, icon, core, single page, feed, document, jira status |
| PagesIcon | @atlaskit/icon/core/pages | Single purpose - Reserved for multipe pages in Confluence. | pages, icon, core, multiple pages, feeds, documents |
| PaintBucketIcon | @atlaskit/icon/core/paint-bucket | Multi purpose - Known usages: Customize fill color. | paint-bucket, paintbucket, icon, core, paint, bucket, fill, background, customize |
| PaintPaletteIcon | @atlaskit/icon/core/paint-palette | Multi purpose - Known usages: Customize. | paint-palette, paintpalette, icon, core, background, customize |
| PanelLeftIcon | @atlaskit/icon/core/panel-left | Reserved for opening a preview panel to the left of the viewport edge. Use for right-to-left languages which invert the navigational chrome. | panel-left, panelleft, icon, core, detail view, left rail, drawer, preview panel, sidebar |
| PanelRightIcon | @atlaskit/icon/core/panel-right | Reserved for opening a preview panel to the right of the viewport edge. Use only for left-to-right languages. | panel-right, panelright, icon, core, detail view, right rail, drawer, preview panel, sidebar |
| PenIcon | @atlaskit/icon/core/pen | Known usages: 'Design task' work type. | pen, icon, core, pen tool, nib, fountain pen, design, work type |
| PeopleGroupIcon | @atlaskit/icon/core/people-group | Single purpose - Known uses: representing a group or collection of people or users. | people-group, peoplegroup, person, user, group, icon, core, users, customers, people |
| PersonIcon | @atlaskit/icon/core/person | Single purpose - Known uses: representing a person or user, owner, contributor. | person, person, user, avatar, icon, core, user, customer |
| PersonAddIcon | @atlaskit/icon/core/person-add | Single purpose - Reserved for adding a user to an object. | person-add, personadd, icon, core, user, customer, plus |
| PersonAddedIcon | @atlaskit/icon/core/person-added | Single purpose - Reserved for a user added to an object. | person-added, personadded, icon, core, user, customer, check, tick |
| PersonAvatarIcon | @atlaskit/icon/core/person-avatar | Single purpose - Reserved for user avatar. | person-avatar, personavatar, icon, core, user, customer |
| PersonOffboardIcon | @atlaskit/icon/core/person-offboard | 📦 @atlaskit/icon/core/person-offboard | person-offboard, personoffboard, icon, core, user, customer, right arrow |
| PersonRemoveIcon | @atlaskit/icon/core/person-remove | Reserved for removing and unfollowing people and teammates. | person-remove, personremove, icon, core, person, remove, delete, unfollow |
| PersonWarningIcon | @atlaskit/icon/core/person-warning | Reserved for showing a warning related to a person or teammate. | person-warning, personwarning, icon, core, person, warning, alert |
| PhoneIcon | @atlaskit/icon/core/phone | Multi purpose - Known uses: call us, phone number input. | phone, icon, core, call, dial out |
| PinIcon | @atlaskit/icon/core/pin | Known uses: unpinned fields. | pin, icon, core, push pin, thumbtack, tack |
| PinFilledIcon | @atlaskit/icon/core/pin-filled | Known uses: pinned fields. | pin-filled, pinfilled, icon, core, push pin, thumbtack, tack, filled |
| PlusSquareIcon | @atlaskit/icon/core/plus-square | Known usages: 'New feature' work type. | plus-square, plussquare, icon, core, square, plus, add, work type |
| PowerPlugIcon | @atlaskit/icon/core/power-plug | Multi purpose - Known uses: plugins, add ons. | power-plug, powerplug, icon, core, plug-in, add-on, socket |
| PremiumIcon | @atlaskit/icon/core/premium | Single purpose - Reserved for premium features. | premium, icon, core, AI, sparkles, stars, new, feature |
| PresenterModeIcon | @atlaskit/icon/core/presenter-mode | Single purpose - Reserved for presenter mode in Confluence. | presenter-mode, presentermode, icon, core, pointer, cursor, presentation, present |
| PrinterIcon | @atlaskit/icon/core/printer | Multi purpose - Known uses: print page, print-friendly view. | printer, icon, core, print |
| PriorityBlockerIcon | @atlaskit/icon/core/priority-blocker | Reserved for blocker work type priority. | priority-blocker, priorityblocker, icon, core, blocked, showstopper, work type status |
| PriorityCriticalIcon | @atlaskit/icon/core/priority-critical | Reserved for critical work type priority. | priority-critical, prioritycritical, icon, core, priority, work type status |
| PriorityHighIcon | @atlaskit/icon/core/priority-high | Reserved for high work type priority. | priority-high, priorityhigh, icon, core, priority, work type status |
| PriorityHighestIcon | @atlaskit/icon/core/priority-highest | Reserved for highest work type priority. | priority-highest, priorityhighest, icon, core, priority, work type status |
| PriorityLowIcon | @atlaskit/icon/core/priority-low | Reserved for low work type priority. | priority-low, prioritylow, icon, core, priority, work type status |
| PriorityLowestIcon | @atlaskit/icon/core/priority-lowest | Reserved for lowest work type priority. | priority-lowest, prioritylowest, icon, core, priority, work type status |
| PriorityMajorIcon | @atlaskit/icon/core/priority-major | Reserved for major work type priority. | priority-major, prioritymajor, icon, core, priority, work type status |
| PriorityMediumIcon | @atlaskit/icon/core/priority-medium | Reserved for medium work type priority. | priority-medium, prioritymedium, icon, core, priority, work type status |
| PriorityMinorIcon | @atlaskit/icon/core/priority-minor | Reserved for minor work type priority. | priority-minor, priorityminor, icon, core, priority, work type status |
| PriorityTrivialIcon | @atlaskit/icon/core/priority-trivial | Reserved for trivial work type priority. | priority-trivial, prioritytrivial, icon, core, priority, work type status |
| ProblemIcon | @atlaskit/icon/core/problem | Reserved for problem work type priority. | problem, icon, core, stop, priority, work type status |
| ProjectIcon | @atlaskit/icon/core/project | Single purpose - Reserved for projects in Jira. | project, icon, core, rocket, rocketship, spaceship |
| ProjectStatusIcon | @atlaskit/icon/core/project-status | Reserved for representing project status in Atlassian Home. | project-status, projectstatus, icon, core, status, traffic lights |
| ProjectionScreenIcon | @atlaskit/icon/core/projection-screen | Multi purpose - Intended usages: Presentation mode. | projection-screen, projectionscreen, icon, core, present, presentation, projector screen, keynote |
| PullRequestIcon | @atlaskit/icon/core/pull-request | Single purpose - Reserved for pull requests. | pull-request, pullrequest, icon, core, git pull request, bitbucket pull request, jira status |
| PulseIcon | @atlaskit/icon/core/pulse | Single purpose - Known uses: work health in Atlassian Home. | pulse, icon, core, pulse, wave, heartbeat, health |
| QuestionCircleIcon | @atlaskit/icon/core/question-circle | Multi purpose - Known uses: help, tip. | question-circle, questioncircle, help, icon, core, help, answers, faq, jira status |
| QuotationMarkIcon | @atlaskit/icon/core/quotation-mark | Multi purpose - Known uses: blockquote, comment, testimonial, blogs in Confluence. | quotation-mark, quotationmark, icon, core, quote, testimonial, blockquote, jira status |
| RadioCheckedIcon | @atlaskit/icon/core/radio-checked | Reserved for the selected state of radio controls. | radio-checked, radiochecked, icon, core, radio, input type, selected |
| RadioUncheckedIcon | @atlaskit/icon/core/radio-unchecked | Reserved for the unselected state of radio controls. | radio-unchecked, radiounchecked, icon, core, radio, input type, unselected |
| RedoIcon | @atlaskit/icon/core/redo | Single purpose - Reserved for redo in Editor. | redo, icon, core, editor, redo, backwards |
| RefreshIcon | @atlaskit/icon/core/refresh | Reserved for reloading or replaying content | refresh, cycle, icon, core, refresh, reload, update, circular arrows, replay |
| ReleaseIcon | @atlaskit/icon/core/release | Single purpose - Reserved for releases in Jira. | release, icon, core, ship, boat |
| RetryIcon | @atlaskit/icon/core/retry | Single purpose - Reserved for retry. | retry, icon, core, try again,  |
| RoadmapIcon | @atlaskit/icon/core/roadmap | Single purpose - Reserved for roadmaps in Jira or Trello. | roadmap, icon, core |
| ScalesIcon | @atlaskit/icon/core/scales | Multi purpose - Known usages: Customer rating in Jira. | scales, icon, core, scales, rule, law |
| ScorecardIcon | @atlaskit/icon/core/scorecard | Single purpose - Reserved for Scorecard in Analytics. | scorecard, icon, core, tick, check, circle, unfinished |
| ScreenIcon | @atlaskit/icon/core/screen | Multi purpose - Known uses: assets in Jira. | screen, desktop, computer, monitor, icon, core, display, monitor, desktop |
| ScreenPlusIcon | @atlaskit/icon/core/screen-plus | Known uses: TBC | screen-plus, screenplus, icon, core, screen, display, monitor, plus, add |
| SearchIcon | @atlaskit/icon/core/search | Single purpose - Reserved for searching objects. | search, find, magnify, icon, core, magnifying glass |
| SendIcon | @atlaskit/icon/core/send | Single purpose - Reserved for sending messages in Rovo Chat. | send, mail, icon, core, submit, paper airplane, paper aeroplane |
| SettingsIcon | @atlaskit/icon/core/settings | Single purpose - Reserved for any object or user settings. | settings, cog, options, configuration, icon, core, system preferences, gear, cog |
| ShapesIcon | @atlaskit/icon/core/shapes | Single purpose - Reserved for shapes in Whiteboards. | shapes, icon, core, objects, whiteboard, asset, graphic |
| ShareIcon | @atlaskit/icon/core/share | Single purpose - Reserved for sharing an object. | share, icon, core, share, access |
| ShieldIcon | @atlaskit/icon/core/shield | Multi purpose - Known uses: classifications in Enterprise Trust, security in Jira (Spork) | shield, icon, core, security, secure, safety, defence, protection, guard |
| ShieldStrikethroughIcon | @atlaskit/icon/core/shield-strikethrough | Known uses: No classification in Enterprise Trust | shield-strikethrough, shieldstrikethrough, icon, core, ️security, secure, safety, defence, protection, guard, strikethrough, classification |
| ShortcutIcon | @atlaskit/icon/core/shortcut | Single purpose - Reserved for shortcuts in Jira. | shortcut, export, icon, core, addshortcut, square, plus |
| ShowMoreHorizontalIcon | @atlaskit/icon/core/show-more-horizontal | Single purpose - Reserved for more action menus. | show-more-horizontal, showmorehorizontal, icon, core, ellipses, three dots, meatball, more actions |
| ShowMoreVerticalIcon | @atlaskit/icon/core/show-more-vertical | Single purpose - Reserved for more action menus, traditionally on mobile. | show-more-vertical, showmorevertical, icon, core, three dots, kebab, more actions |
| ShrinkDiagonalIcon | @atlaskit/icon/core/shrink-diagonal | Single purpose - Reserved for shrinking the height and width of modals, panels, media, or objects. | shrink-diagonal, shrinkdiagonal, icon, core, resize, diagonal arrows |
| ShrinkHorizontalIcon | @atlaskit/icon/core/shrink-horizontal | Single purpose - Reserved for contracting or reducing the width of an element. | shrink-horizontal, shrinkhorizontal, icon, core, contract, width, horizontal arrows |
| ShrinkVerticalIcon | @atlaskit/icon/core/shrink-vertical | Single purpose - Reserved for contracting or reducing the height of an element. | shrink-vertical, shrinkvertical, icon, core, contract, height, vertical arrows |
| SidebarCollapseIcon | @atlaskit/icon/core/sidebar-collapse | Single purpose - Reserved for collapsing the navigation sidebar. | sidebar-collapse, sidebarcollapse, icon, core, navigation, close sidebar |
| SidebarExpandIcon | @atlaskit/icon/core/sidebar-expand | Single purpose - Reserved for expanding the navigation sidebar. | sidebarexpand, icon, core, navigation, open sidebar |
| SmartLinkIcon | @atlaskit/icon/core/smart-link | Reserved for representing Smart links. | smart-link, smartlink, icon, core, smart link |
| SmartLinkCardIcon | @atlaskit/icon/core/smart-link-card | Reserved for representing Smart link preview cards. | smart-link-card, smartlinkcard, icon, core, smart link, url, card, link preview |
| SmartLinkEmbedIcon | @atlaskit/icon/core/smart-link-embed | Reserved for representing Smart link embeds. | smart-link-embed, smartlinkembed, icon, core, smart link, url, embed |
| SmartLinkInlineIcon | @atlaskit/icon/core/smart-link-inline | Reserved for representing inline Smart link lozenges. | smart-link-inline, smartlinkinline, icon, core, smart link, url, inline |
| SmartLinkListIcon | @atlaskit/icon/core/smart-link-list | Reserved for representing Smart link embedded link lists. | smart-link-list, smartlinklist, icon, core, smart link, url, embed, list, table, linked search results |
| SnippetIcon | @atlaskit/icon/core/snippet | Single purpose - Reserved for snippets in Bitbucket. | snippet, icon, core, scissors, cut |
| SortAscendingIcon | @atlaskit/icon/core/sort-ascending | Single purpose - Reserved for sorting data. | sort-ascending, sortascending, icon, core, data, sort, up |
| SortDescendingIcon | @atlaskit/icon/core/sort-descending | Single purpose - Reserved for sorting data. | sort-descending, sortdescending, icon, core, data, sort, down |
| SpreadsheetIcon | @atlaskit/icon/core/spreadsheet | Single purpose - Reserved for spreadsheets. | spreadsheet, icon, core, table, cells, data |
| SprintIcon | @atlaskit/icon/core/sprint | Single purpose - Reserved for sprints in Jira. | sprint, icon, core, loop, iterate |
| StarStarredIcon | @atlaskit/icon/core/star-starred | Single purpose - Reserved for starred or favourited objects. | star-starred, starstarred, icon, core, favourite, star, starred, filled |
| StarUnstarredIcon | @atlaskit/icon/core/star-unstarred | Single purpose - Reserved for starring or favoriting objects. | star-unstarred, starunstarred, icon, core, favourite, star |
| StatusDiscoveryIcon | @atlaskit/icon/core/status-discovery | Reserved for discovery statuses and messaging. Filled status icons provide higher visual contrast to draw attention to important information. | status-discovery, statusdiscovery, icon, core, discovery, note, filled, onboarding, status |
| StatusErrorIcon | @atlaskit/icon/core/status-error | Reserved for error statuses and messaging. Filled status icons provide higher visual contrast to draw attention to important information. | status-error, statuserror, icon, core, filled, status, danger, exclamation, !, error |
| StatusInformationIcon | @atlaskit/icon/core/status-information | Reserved for information statuses and messaging.  Filled status icons provide higher visual contrast to draw attention to important information. For information tooltips, use the unfilled 'information circle' icon. | status-information, statusinformation, icon, core, info, filled, status, information |
| StatusSuccessIcon | @atlaskit/icon/core/status-success | Reserved for success statuses and messaging. Filled status icons provide higher visual contrast to draw attention to important information. | status-success, statussuccess, icon, core, tick, completed, success, filled, check mark, status |
| StatusVerifiedIcon | @atlaskit/icon/core/status-verified | Reserved for representing verified content. Filled status icons provide higher visual contrast draw attention to important information. | status-verified, statusverified, icon, core, verified badge, status |
| StatusWarningIcon | @atlaskit/icon/core/status-warning | Reserved for warning statuses. Filled status icons provide higher visual contrast to draw attention to important information. | status-warning, statuswarning, icon, core, alert, filled, exclamation, !, warning, status |
| StopwatchIcon | @atlaskit/icon/core/stopwatch | Multi purpose - Known uses: timer in Confluence Whiteboards. | stopwatch, icon, core, timer |
| StoryIcon | @atlaskit/icon/core/story | Reserved for story work type. | story, icon, core, bookmark, work type |
| StrokeWeightExtraLargeIcon | @atlaskit/icon/core/stroke-weight-extra-large | Reserved for representing the thickest border stroke width. | stroke-weight-extra-large, strokeweightextralarge, icon, core, border, weight, thickness, stroke, confluence, editor, whiteboards, thickest |
| StrokeWeightLargeIcon | @atlaskit/icon/core/stroke-weight-large | Reserved for representing thick border stroke widths. | stroke-weight-large, strokeweightlarge, icon, core, border, weight, thickness, stroke, thick, confluence, editor, whiteboards |
| StrokeWeightMediumIcon | @atlaskit/icon/core/stroke-weight-medium | Reserved for representing medium border stroke widths. | stroke-weight-medium, strokeweightmedium, icon, core, border, weight, stroke, medium, thickness, confluence, editor, whiteboards |
| StrokeWeightSmallIcon | @atlaskit/icon/core/stroke-weight-small | Reserved for representing thin border stroke widths. | stroke-weight-small, strokeweightsmall, icon, core, border, weight, thickness, stroke, confluence, editor, whiteboards, thin |
| SubtasksIcon | @atlaskit/icon/core/subtasks | Reserved for subtask work type. | subtasks, icon, core, todo, checklist, work type |
| SuccessIcon | @atlaskit/icon/core/success | Reserved for success statuses and messaging. Filled status icons provide higher visual contrast to draw attention to important information. | success, icon, core, tick, completed, success, filled, check mark, status |
| SupportIcon | @atlaskit/icon/core/support | Reserved for representing help support. | support, icon, core, support, help, life raft, life ring, lifebuoy, life preserver |
| TableCellClearIcon | @atlaskit/icon/core/table-cell-clear | Reserved for clearing the contents of table cells. | table-cell-clear, tablecellclear, icon, core, table, cell, clear, empty |
| TableCellMergeIcon | @atlaskit/icon/core/table-cell-merge | Reserved for merging table cells. | table-cell-merge, tablecellmerge, icon, core, table, cell, merge, combine, join |
| TableCellSplitIcon | @atlaskit/icon/core/table-cell-split | Reserved for splitting joined table cells. | table-cell-split, tablecellsplit, icon, core, table, cell, split, divide, separate |
| TableColumnAddLeftIcon | @atlaskit/icon/core/table-column-add-left | Reserved for adding a table column to the left of the selected column. | table-column-add-left, tablecolumnaddleft, icon, core, table, column, add, plus, left, before |
| TableColumnAddRightIcon | @atlaskit/icon/core/table-column-add-right | Reserved for adding a table column to the right of the selected column. | table-column-add-right, tablecolumnaddright, icon, core, table, column, add, right, after |
| TableColumnDeleteIcon | @atlaskit/icon/core/table-column-delete | Reserved for deleting a table column. | table-column-delete, tablecolumndelete, icon, core, table, column, delete, remove, x |
| TableColumnMoveLeftIcon | @atlaskit/icon/core/table-column-move-left | Reserved for moving a table column to the left of its current location. | table-column-move-left, tablecolumnmoveleft, icon, core, table, column, move, left, arrow |
| TableColumnMoveRightIcon | @atlaskit/icon/core/table-column-move-right | Reserved for moving a table column to the right of its current location. | table-column-move-right, tablecolumnmoveright, icon, core, table, column, move, right, arrow |
| TableColumnsDistributeIcon | @atlaskit/icon/core/table-columns-distribute | Reserved for distributing the width of table columns evenly. | table-columns-distribute, tablecolumnsdistribute, icon, core, table, columns, distribute, even, equidistant |
| TableRowAddAboveIcon | @atlaskit/icon/core/table-row-add-above | Reserved for adding a table row above the selected row. | table-row-add-above, tablerowaddabove, icon, core, table, row, add, plus, above, up |
| TableRowAddBelowIcon | @atlaskit/icon/core/table-row-add-below | Reserved for adding a table row below the selected row. | table-row-add-below, tablerowaddbelow, icon, core, table, row, add, plus, below, down |
| TableRowDeleteIcon | @atlaskit/icon/core/table-row-delete | Reserved for deleting a table row. | table-row-delete, tablerowdelete, icon, core, table, row, delete, remove, x |
| TableRowMoveDownIcon | @atlaskit/icon/core/table-row-move-down | Reserved for moving a table row below its current location. | table-row-move-down, tablerowmovedown, icon, core, table, row, move, down, arrow, after |
| TableRowMoveUpIcon | @atlaskit/icon/core/table-row-move-up | Reserved for moving a table row above its current location. | table-row-move-up, tablerowmoveup, icon, core, table, row, move, up, arrow, above |
| TagIcon | @atlaskit/icon/core/tag | Single purpose - Reserved for tags in Atlas. | tag, icon, core, label, topic |
| TakeoutFoodIcon | @atlaskit/icon/core/takeout-food | Multi purpose - Known usages: Food emoji category. | takeout-food, takeoutfood, icon, core, takeaway, takeout, food, burger, drink |
| TargetIcon | @atlaskit/icon/core/target | Single purpose - Reserved for targets. | target, icon, core, target, bullseye |
| TaskIcon | @atlaskit/icon/core/task | Single purpose - Reserved for tasks in Jira. | task, check, tick, icon, core, single task, todo, list, check mark, tick |
| TaskInProgressIcon | @atlaskit/icon/core/task-in-progress | Reserved for in progress task status. Used in JSM Calendar view. | task-in-progress, taskinprogress, icon, core, calendar, task, status, in progress |
| TaskToDoIcon | @atlaskit/icon/core/task-to-do | Reserved for to-do task status. Used in JSM Calendar view. | task-to-do, tasktodo, icon, core, calendar, task, to-do, todo, status |
| TasksIcon | @atlaskit/icon/core/tasks | Single purpose - Reserved for multiple tasks in Jira. | tasks, icon, core, multiple tasks, todo, list, check mark, tick |
| TeamsIcon | @atlaskit/icon/core/teams | Single purpose - Reserved for teams in Atlassian. | teams, icon, core, infinite love, people, persons, customers, users |
| TextIcon | @atlaskit/icon/core/text | Single purpose - Reserved for representing text objects. | text, icon, core, character, font, letter, type, typography, text |
| TextBoldIcon | @atlaskit/icon/core/text-bold | Single purpose - Reserved for bolding text. | text-bold, textbold, icon, core, text, type, bold, font |
| TextHeadingIcon | @atlaskit/icon/core/text-heading | Reserved for representing heading styles | text-heading, textheading, icon, core, text, heading, H, editor, text style |
| TextIndentLeftIcon | @atlaskit/icon/core/text-indent-left | Single purpose - Reserved for shifting the indent of text content left. | text-indent-left, textindentleft, icon, core, text, outdent, left, arrow |
| TextIndentRightIcon | @atlaskit/icon/core/text-indent-right | Single purpose - Reserved for shifting the indent of text content right. | text-indent-right, textindentright, icon, core, text, indent, right, arrow |
| TextItalicIcon | @atlaskit/icon/core/text-italic | Single purpose - Reserved for italicizing text. | text-italic, textitalic, icon, core, text, type, italic, font |
| TextShortenIcon | @atlaskit/icon/core/text-shorten | Reserved for shortening text content with Atlassian Intelligence. | text-shorten, textshorten, icon, core, text, shorten, abbreviate, condense, AI |
| TextSpellcheckIcon | @atlaskit/icon/core/text-spellcheck | Single purpose - Reserved for spellchecking. | text-spellcheck, textspellcheck, icon, core, text, spelling, typo, spellcheck |
| TextStrikethroughIcon | @atlaskit/icon/core/text-strikethrough | Reserved for strikethrough text tool | text-strikethrough, textstrikethrough, icon, core, text, strikethrough, editor, cross out |
| TextStyleIcon | @atlaskit/icon/core/text-style | Single purpose - Reserved for text styles in Editor. | text-style, textstyle, icon, core, characters, font, letters, type, typography |
| TextUnderlineIcon | @atlaskit/icon/core/text-underline | Reserved for underlined text tool | text-underline, textunderline, icon, core, text, underline, U, editor |
| TextWrapIcon | @atlaskit/icon/core/text-wrap | Reserved for wrapping text so it spans multiple lines. | text-wrap, textwrap, icon, core, text, wrap, line wrap |
| ThemeIcon | @atlaskit/icon/core/theme | Single purpose - Reserved for representing themes and theme switching. | theme, icon, core, theme, light mode, dark mode, theme switcher |
| ThumbsDownIcon | @atlaskit/icon/core/thumbs-down | Multi purpose - Known uses: voting, feedback in AI. | thumbs-down, thumbsdown, icon, core, vote, downvote, dislike, feedback, hand |
| ThumbsUpIcon | @atlaskit/icon/core/thumbs-up | Multi purpose - Known uses: voting options in Jira, like. | thumbs-up, thumbsup, icon, core, vote, upvote, like, feedback, hand |
| TimelineIcon | @atlaskit/icon/core/timeline | Single purpose - Reserved for timelines in Jira or Trello. | timeline, icon, core, gantt, calendar |
| ToolsIcon | @atlaskit/icon/core/tools | Known usages: 'Service request' Jira work type. | tools, icon, core, tools, wrench, spanner, screwdriver |
| TransitionIcon | @atlaskit/icon/core/transition | Single purpose - Reserved for transitions in Analytics. | transition, icon, core, connector, movement |
| TranslateIcon | @atlaskit/icon/core/translate | Multi purpose - Known uses: language settings, translation. | translate, icon, core, language, translation, globe |
| TreeIcon | @atlaskit/icon/core/tree | Multi purpose - Known uses: hierarchy, organization chart. | tree, icon, core, hierarchy, org chart, structure |
| UndoIcon | @atlaskit/icon/core/undo | Single purpose - Reserved for undo in Editor. | undo, icon, core, editor, undo, backwards |
| UploadIcon | @atlaskit/icon/core/upload | Single purpose - Reserved for file uploads. | upload, cloud, icon, core, up arrow, file upload |
| VehicleCarIcon | @atlaskit/icon/core/vehicle-car | Multi purpose - Known uses: transportation, delivery. | vehicle-car, vehiclecar, icon, core, car, transportation, delivery |
| VideoIcon | @atlaskit/icon/core/video | Multi purpose - Known uses: video files, video content. | video, icon, core, video file, video content |
| VideoNextIcon | @atlaskit/icon/core/video-next | Single purpose - Reserved for next video control. | video-next, videonext, icon, core, next, skip, video control |
| VideoNextOverlayIcon | @atlaskit/icon/core/video-next-overlay | Reserved for next video control overlay. | video-next-overlay, videonextoverlay, icon, core, next, skip, video control, overlay |
| VideoPauseIcon | @atlaskit/icon/core/video-pause | Single purpose - Reserved for pause video control. | video-pause, videopause, icon, core, pause, video control |
| VideoPauseOverlayIcon | @atlaskit/icon/core/video-pause-overlay | Reserved for pause video control overlay. | video-pause-overlay, videopauseoverlay, icon, core, pause, video control, overlay |
| VideoPlayIcon | @atlaskit/icon/core/video-play | Single purpose - Reserved for play video control. | video-play, videoplay, icon, core, play, video control |
| VideoPlayOverlayIcon | @atlaskit/icon/core/video-play-overlay | Reserved for play video control overlay. | video-play-overlay, videoplayoverlay, icon, core, play, video control, overlay |
| VideoPreviousIcon | @atlaskit/icon/core/video-previous | Single purpose - Reserved for previous video control. | video-previous, videoprevious, icon, core, previous, rewind, video control |
| VideoPreviousOverlayIcon | @atlaskit/icon/core/video-previous-overlay | Reserved for previous video control overlay. | video-previous-overlay, videopreviousoverlay, icon, core, previous, rewind, video control, overlay |
| VideoSkipBackwardFifteenIcon | @atlaskit/icon/core/video-skip-backward-fifteen | Reserved for skipping backward 15 seconds in video. | video-skip-backward-fifteen, videoskipbackwardfifteen, icon, core, skip, backward, 15 seconds, video control |
| VideoSkipBackwardTenIcon | @atlaskit/icon/core/video-skip-backward-ten | Reserved for skipping backward 10 seconds in video. | video-skip-backward-ten, videoskipbackwardten, icon, core, skip, backward, 10 seconds, video control |
| VideoSkipForwardFifteenIcon | @atlaskit/icon/core/video-skip-forward-fifteen | Reserved for skipping forward 15 seconds in video. | video-skip-forward-fifteen, videoskipforwardfifteen, icon, core, skip, forward, 15 seconds, video control |
| VideoSkipForwardTenIcon | @atlaskit/icon/core/video-skip-forward-ten | Reserved for skipping forward 10 seconds in video. | video-skip-forward-ten, videoskipforwardten, icon, core, skip, forward, 10 seconds, video control |
| VideoStopIcon | @atlaskit/icon/core/video-stop | Single purpose - Reserved for stop video control. | video-stop, videostop, icon, core, stop, video control |
| VideoStopOverlayIcon | @atlaskit/icon/core/video-stop-overlay | Reserved for stop video control overlay. | video-stop-overlay, videostopoverlay, icon, core, stop, video control, overlay |
| VolumeHighIcon | @atlaskit/icon/core/volume-high | Multi purpose - Known uses: high volume, unmuted audio. | volume-high, volumehigh, icon, core, volume, high, unmuted, audio |
| VolumeLowIcon | @atlaskit/icon/core/volume-low | Multi purpose - Known uses: low volume, quiet audio. | volume-low, volumelow, icon, core, volume, low, quiet, audio |
| VolumeMutedIcon | @atlaskit/icon/core/volume-muted | Multi purpose - Known uses: muted audio, no sound. | volume-muted, volumemuted, icon, core, volume, muted, no sound, audio |
| WarningIcon | @atlaskit/icon/core/warning | Reserved for warning statuses and messaging. Filled status icons provide higher visual contrast to draw attention to important information. | warning, alert, icon, core, filled, status, exclamation, !, warning |
| WhiteboardIcon | @atlaskit/icon/core/whiteboard | Single purpose - Reserved for whiteboards in Confluence. | whiteboard, icon, core, whiteboard, canvas, drawing |
| WorkItemIcon | @atlaskit/icon/core/work-item | Single purpose - Reserved for work items in Jira. | work-item, workitem, icon, core, work item, task, issue |
| WorkItemsIcon | @atlaskit/icon/core/work-items | Single purpose - Reserved for multiple work items in Jira. | work-items, workitems, icon, core, work items, tasks, issues |
| ZoomInIcon | @atlaskit/icon/core/zoom-in | Single purpose - Reserved for zooming in on content. | zoom-in, zoomin, icon, core, zoom, magnify, enlarge |
| ZoomOutIcon | @atlaskit/icon/core/zoom-out | Single purpose - Reserved for zooming out on content. | zoom-out, zoomout, icon, core, zoom, reduce, shrink |



## Usage Guidelines

### Always Include Labels
```tsx
// ✅ CORRECT
<AddIcon label="Add new item" />
<PersonIcon label="User profile" />

// ❌ WRONG
<AddIcon />
<PersonIcon />
```

### Navigation Menu Icons
```tsx
// ✅ CORRECT - Use elemBefore prop
<LinkMenuItem href="/dashboard" elemBefore={<HomeIcon label="" />}>
  Dashboard
</LinkMenuItem>

// ❌ WRONG - Don't put icons in children
<LinkMenuItem href="/dashboard">
  <HomeIcon label="" /> Dashboard
</LinkMenuItem>
```

### Icon Sizes
- Icons are 16px by default
- No need to specify size unless required by design
- Use design tokens for color when needed

### Finding Icons
1. **Search by category** - Look in the relevant category above
2. **Search by function** - Think about what the icon represents
3. **Check alternatives** - Some concepts have multiple icon options
4. **Verify existence** - Only use icons listed in this guide

### When You Can't Find an Icon
1. **Search the full list** - Look through all categories
2. **Consider alternatives** - Use a similar concept
3. **Ask for clarification** - Don't guess or invent names
4. **Check the complete reference** - See `modules/use-icon-replit.md` for full list

## Complete Icon List

For the complete list of all available icons with detailed usage information, see the full reference in the original file. This simplified guide covers the most commonly used icons organized by category for easy reference.rdbn
