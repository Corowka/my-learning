function varargout = L2T4(varargin)
    gui_Singleton = 1;
    gui_State = struct('gui_Name',       mfilename, ...
                       'gui_Singleton',  gui_Singleton, ...
                       'gui_OpeningFcn', @L2T4_OpeningFcn, ...
                       'gui_OutputFcn',  @L2T4_OutputFcn, ...
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


function L2T4_OpeningFcn(hObject, eventdata, handles, varargin)
    global x0
    x0 = 0;
    global dx
    dx = 0.01;
    global xn
    xn = 20;
    global x 
    x = x0:dx:xn;
    global f
    f = @(x) sin(x);
    handles.output = hObject;
    guidata(hObject, handles);
end


function varargout = L2T4_OutputFcn(hObject, eventdata, handles) 
    varargout{1} = handles.output;
end


function pushbutton1_Callback(hObject, eventdata, handles)
    global f
    f = @(x) sin(x);
end


function pushbutton3_Callback(hObject, eventdata, handles)
    global f
    f = @(x) cos(x);
end


function pushbutton4_Callback(hObject, eventdata, handles)
    global f
    f = @(x) tan(x);
end


function pushbutton5_Callback(hObject, eventdata, handles)
    global f
    f = @(x) cot(x);
end


function pushbutton6_Callback(hObject, eventdata, handles)
    global f
    f = @(x) sin(x) .^ 2 + cos(x) .^ 3 + tan(x) .^ 4 + cot(x) .^ 5;
end


function edit1_Callback(hObject, eventdata, handles)
    global x
    global x0
    global dx
    global xn
    str = get(hObject, 'String');
    val = str2double(str);
    x0 = val;
    x = x0:dx:xn;
end


function edit1_CreateFcn(hObject, eventdata, handles)
    if ispc && isequal(get(hObject,'BackgroundColor'), get(0,'defaultUicontrolBackgroundColor'))
        set(hObject,'BackgroundColor','white');
    end
end


function edit2_Callback(hObject, eventdata, handles)
    global x
    global x0
    global dx
    global xn
    str = get(hObject, 'String');
    val = str2double(str);
    dx = val;
    x = x0:dx:xn;
end


function edit2_CreateFcn(hObject, eventdata, handles)
    if ispc && isequal(get(hObject,'BackgroundColor'), get(0,'defaultUicontrolBackgroundColor'))
        set(hObject,'BackgroundColor','white');
    end
end


function edit3_Callback(hObject, eventdata, handles)
    global x
    global x0
    global dx
    global xn
    str = get(hObject, 'String');
    val = str2double(str);
    xn = val;
    x = x0:dx:xn;
end


function edit3_CreateFcn(hObject, eventdata, handles)
    if ispc && isequal(get(hObject,'BackgroundColor'), get(0,'defaultUicontrolBackgroundColor'))
        set(hObject,'BackgroundColor','white');
    end
end


function pushbutton8_Callback(hObject, eventdata, handles)
    global x
    global f
    plot(x, f(x), 'b', 'LineWidth', 2)
    legend('y = f(x)');
    xlabel('x');
    ylabel('y');
end
