function varargout = L2T2(varargin)
    
    gui_Singleton = 1;
    gui_State = struct('gui_Name',       mfilename, ...
                       'gui_Singleton',  gui_Singleton, ...
                       'gui_OpeningFcn', @L2T2_OpeningFcn, ...
                       'gui_OutputFcn',  @L2T2_OutputFcn, ...
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


function L2T2_OpeningFcn(hObject, eventdata, handles, varargin)
    
    RungeKutta(0);

    handles.output = hObject;
    guidata(hObject, handles);
    
end

function varargout = L2T2_OutputFcn(hObject, eventdata, handles) 
    varargout{1} = handles.output;
end


function pushbutton1_Callback(hObject, eventdata, handles)
    RungeKutta(0);
end


function pushbutton2_Callback(hObject, eventdata, handles)
    RungeKutta(0.1);
end 


function axes1_CreateFcn(hObject, eventdata, handles)

end


function RungeKutta(K)
    
    y0 = [0; 1];
    tspan = [0, 20];
    
    if K == 0
        f = @(t, y) [y(2); -y(1)];
    else
        f = @(t, y) [0.01 * t .^ 2 + y(2); -y(1)];
    end

    [t, y] = ode45(f, tspan, y0);
    
    plot(t, y(:,1), 'b', t, y(:,2), 'r', 'LineWidth', 2);
    legend('y1', 'y2');
    xlabel('t');
    ylabel('y');
    title(['Решение системы дифференциальных уравнений, K = ' num2str(K)]);
   
end
