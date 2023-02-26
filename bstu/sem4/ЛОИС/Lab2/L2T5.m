function varargout = L2T5(varargin)
    gui_Singleton = 1;
    gui_State = struct('gui_Name',       mfilename, ...
                       'gui_Singleton',  gui_Singleton, ...
                       'gui_OpeningFcn', @L2T5_OpeningFcn, ...
                       'gui_OutputFcn',  @L2T5_OutputFcn, ...
                       'gui_LayoutFcn',  [] , ...
                       'gui_Callback',   []);
    if nargin && ischar(varargin{1})
        gui_State.gui_Callback = str2func(varargin{1});
    end
    if nargout
        [varargout{1:nargout}] = gui_mainfcn(gui_State, varargin{:});
    else
        gui_mainfcn(gui_State, varargin{:});
    end
end

function L2T5_OpeningFcn(hObject, eventdata, handles, varargin)
    global y0; global tspan; global f; global axes_pos;
    y0 = 0; tspan = [0, 5]; f = @(t, y) -20*y + 10*sin(t);
    handles.output = hObject;
    guidata(hObject, handles);
end

function varargout = L2T5_OutputFcn(hObject, eventdata, handles) 
    varargout{1} = handles.output;
end

function pushbutton1_Callback(hObject, eventdata, handles)
    set(hObject, 'Visible', 'off');
    set(handles.text1, 'Visible', 'off');
    set(handles.text2, 'Visible', 'off');
    set(handles.text3, 'Visible', 'off');
    set(handles.text4, 'Visible', 'off');
    set(handles.edit1, 'Visible', 'off');
    set(handles.edit2, 'Visible', 'off');
    set(handles.edit3, 'Visible', 'off');
    global axes_pos; axes_pos = get(handles.axes1, 'Position');
    set(handles.axes1, 'Position', [0, 0, 114.7, 32.4]);
    set(handles.pushbutton2, 'Visible', 'on');
    global y0; global tspan; global f; [t, y] = ode15s(f, tspan, y0);
    plot(t, y, 'y', 'LineWidth', 2); legend('y = f(x)'); xlabel('x'); ylabel('y')
end

function edit1_Callback(hObject, eventdata, handles)
    global y0; y0 = str2double(get(hObject, 'String'));
end

function edit1_CreateFcn(hObject, eventdata, handles)
    if ispc && isequal(get(hObject,'BackgroundColor'), get(0,'defaultUicontrolBackgroundColor'))
        set(hObject,'BackgroundColor','white');
    end
end

function edit2_Callback(hObject, eventdata, handles)
    global tspan; tspan = [str2double(get(hObject, 'String')), tspan(2)];
end

function edit2_CreateFcn(hObject, eventdata, handles)
    if ispc && isequal(get(hObject,'BackgroundColor'), get(0,'defaultUicontrolBackgroundColor'))
        set(hObject,'BackgroundColor','white');
    end
end

function edit3_Callback(hObject, eventdata, handles)
    global tspan; tspan = [tspan(1), str2double(get(hObject, 'String'))];
end

function edit3_CreateFcn(hObject, eventdata, handles)
    if ispc && isequal(get(hObject,'BackgroundColor'), get(0,'defaultUicontrolBackgroundColor'))
        set(hObject,'BackgroundColor','white');
    end
end

function pushbutton2_Callback(hObject, eventdata, handles)
    set(hObject, 'Visible', 'off');
    set(handles.text1, 'Visible', 'on');
    set(handles.text2, 'Visible', 'on');
    set(handles.text3, 'Visible', 'on');
    set(handles.text4, 'Visible', 'on');
    set(handles.edit1, 'Visible', 'on');
    set(handles.edit2, 'Visible', 'on');
    set(handles.edit3, 'Visible', 'on');
    global axes_pos;
    set(handles.axes1, 'Position', axes_pos);
    set(handles.pushbutton1, 'Visible', 'on')
end

function pushbutton2_CreateFcn(hObject, eventdata, handles)
    set(hObject, 'Visible', 'off');
end
